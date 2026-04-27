import ast


CONSTRUCT_CHECKERS = {
    "for": lambda tree: any(isinstance(node, ast.For) for node in ast.walk(tree)),
    "while": lambda tree: any(isinstance(node, ast.While) for node in ast.walk(tree)),
    "break": lambda tree: any(isinstance(node, ast.Break) for node in ast.walk(tree)),
    "continue": lambda tree: any(isinstance(node, ast.Continue) for node in ast.walk(tree)),
    "return": lambda tree: any(isinstance(node, ast.Return) for node in ast.walk(tree)),
    "function_def": lambda tree: any(isinstance(node, ast.FunctionDef) for node in ast.walk(tree)),
    "list_comp": lambda tree: any(isinstance(node, ast.ListComp) for node in ast.walk(tree)),
    "dict_comp": lambda tree: any(isinstance(node, ast.DictComp) for node in ast.walk(tree)),
    "set_comp": lambda tree: any(isinstance(node, ast.SetComp) for node in ast.walk(tree)),
    "generator_exp": lambda tree: any(isinstance(node, ast.GeneratorExp) for node in ast.walk(tree)),
    "recursion": lambda tree: _has_recursion(tree),
    "nested_loop": lambda tree: _has_nested_loop(tree),
}


def _has_recursion(tree):
    functions = [node for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)]

    for function in functions:
        function_name = function.name
        for inner_node in ast.walk(function):
            if isinstance(inner_node, ast.Call) and isinstance(inner_node.func, ast.Name):
                if inner_node.func.id == function_name:
                    return True
    return False


def _has_nested_loop(tree):
    loop_nodes = (ast.For, ast.While)

    for node in ast.walk(tree):
        if isinstance(node, loop_nodes):
            for inner_node in ast.walk(node):
                if inner_node is node:
                    continue
                if isinstance(inner_node, loop_nodes):
                    return True
    return False


def _normalize_construct_name(name):
    return (name or "").strip().lower()


def _check_construct(tree, construct_name):
    normalized = _normalize_construct_name(construct_name)
    checker = CONSTRUCT_CHECKERS.get(normalized)

    if checker is None:
        # Unknown construct names are treated as failed checks so they
        # surface early during development instead of silently passing.
        return False

    return checker(tree)


def evaluate_ast_rules(code, rules):
    """
    Validate user code against a queryset/list of ASTRule objects.

    Returns a dict:
    {
        "ast_result": bool,
        "feedback_text": str,
        "errors": list[str],
        "matched": list[str],
        "missing": list[str],
        "forbidden_found": list[str],
    }
    """
    try:
        tree = ast.parse(code)
    except SyntaxError as exc:
        return {
            "ast_result": False,
            "feedback_text": f"Syntax error: {exc.msg} at line {exc.lineno}.",
            "errors": [f"{exc.msg} at line {exc.lineno}"],
            "matched": [],
            "missing": [],
            "forbidden_found": [],
        }

    matched = []
    missing = []
    forbidden_found = []

    for rule in rules:
        construct_name = _normalize_construct_name(rule.construct_name)
        exists = _check_construct(tree, construct_name)

        if rule.is_forbidden:
            if exists:
                forbidden_found.append(construct_name)
            continue

        if exists:
            matched.append(construct_name)
        else:
            missing.append(construct_name)

    ast_result = not missing and not forbidden_found

    feedback_parts = []
    if matched:
        feedback_parts.append(f"Matched: {', '.join(matched)}.")
    if missing:
        feedback_parts.append(f"Missing required constructs: {', '.join(missing)}.")
    if forbidden_found:
        feedback_parts.append(f"Forbidden constructs found: {', '.join(forbidden_found)}.")
    if not feedback_parts:
        feedback_parts.append("No AST rules were provided for this task.")

    return {
        "ast_result": ast_result,
        "feedback_text": " ".join(feedback_parts),
        "errors": [],
        "matched": matched,
        "missing": missing,
        "forbidden_found": forbidden_found,
    }
