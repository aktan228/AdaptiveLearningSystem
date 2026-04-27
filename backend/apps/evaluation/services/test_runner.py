import contextlib
import io
from collections import deque


SAFE_BUILTINS = {
    "abs": abs,
    "all": all,
    "any": any,
    "bool": bool,
    "dict": dict,
    "enumerate": enumerate,
    "float": float,
    "int": int,
    "len": len,
    "list": list,
    "max": max,
    "min": min,
    "print": print,
    "range": range,
    "reversed": reversed,
    "round": round,
    "set": set,
    "sorted": sorted,
    "str": str,
    "sum": sum,
    "tuple": tuple,
    "zip": zip,
}


def _normalize_output(value):
    return (value or "").strip().replace("\r\n", "\n")


def _make_input_fn(raw_input):
    lines = deque((raw_input or "").splitlines())

    def _input(prompt=""):
        if lines:
            return lines.popleft()
        return ""

    return _input


def _build_execution_globals(raw_input):
    builtins_dict = dict(SAFE_BUILTINS)
    builtins_dict["input"] = _make_input_fn(raw_input)
    return {"__builtins__": builtins_dict}


def _run_single_test_case(code, test_case):
    stdout = io.StringIO()
    exec_globals = _build_execution_globals(test_case.input_data)

    try:
        compiled_code = compile(code, "<submission>", "exec")
        with contextlib.redirect_stdout(stdout):
            exec(compiled_code, exec_globals, exec_globals)
    except SyntaxError as exc:
        return {
            "passed": False,
            "actual_output": "",
            "error_output": f"Syntax error: {exc.msg} at line {exc.lineno}.",
        }
    except Exception as exc:
        return {
            "passed": False,
            "actual_output": _normalize_output(stdout.getvalue()),
            "error_output": f"{type(exc).__name__}: {exc}",
        }

    actual_output = _normalize_output(stdout.getvalue())
    expected_output = _normalize_output(test_case.expected_output)
    passed = actual_output == expected_output

    return {
        "passed": passed,
        "actual_output": actual_output,
        "error_output": "",
    }


def run_test_cases(code, test_cases):
    """
    Execute code against a list/queryset of TestCase objects.

    This is a simple in-process runner for local development.
    It is not a secure sandbox and should be replaced with an isolated
    execution environment before running untrusted code in production.
    """
    ordered_cases = list(test_cases)
    total_count = len(ordered_cases)
    passed_count = 0
    case_results = []
    first_error = ""

    for test_case in ordered_cases:
        case_result = _run_single_test_case(code, test_case)
        case_results.append(
            {
                "id": test_case.id,
                "order": getattr(test_case, "order", 0),
                "is_hidden": test_case.is_hidden,
                "passed": case_result["passed"],
                "actual_output": case_result["actual_output"],
                "expected_output": _normalize_output(test_case.expected_output),
                "error_output": case_result["error_output"],
            }
        )

        if case_result["passed"]:
            passed_count += 1
        elif not first_error:
            first_error = case_result["error_output"]

    test_result = total_count > 0 and passed_count == total_count

    if total_count == 0:
        feedback_text = "No test cases were provided for this task."
    elif test_result:
        feedback_text = f"All test cases passed ({passed_count}/{total_count})."
    elif first_error:
        feedback_text = (
            f"Passed {passed_count}/{total_count} test cases. "
            f"First error: {first_error}"
        )
    else:
        feedback_text = f"Passed {passed_count}/{total_count} test cases."

    return {
        "test_result": test_result,
        "passed_count": passed_count,
        "total_count": total_count,
        "error_output": first_error,
        "feedback_text": feedback_text,
        "case_results": case_results,
    }
