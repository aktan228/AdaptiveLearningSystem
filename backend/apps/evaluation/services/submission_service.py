from django.db import transaction

from apps.evaluation.models import Submission
from apps.evaluation.services.ast_checker import evaluate_ast_rules
from apps.evaluation.services.test_runner import run_test_cases
from apps.progress.services.progress_service import update_task_progress_from_submission


def _build_feedback_text(ast_feedback, test_feedback):
    parts = []
    if ast_feedback:
        parts.append(ast_feedback)
    if test_feedback:
        parts.append(test_feedback)
    return " ".join(parts).strip()


def evaluate_code_preview(*, task, code):
    ast_rules = task.ast_rules.all()
    test_cases = task.test_cases.all().order_by("order", "id")

    ast_data = evaluate_ast_rules(code, ast_rules)
    test_data = run_test_cases(code, test_cases)

    return {
        "status": "done",
        "task": task.id,
        "ast_result": ast_data["ast_result"],
        "test_result": test_data["test_result"],
        "feedback_text": _build_feedback_text(
            ast_data.get("feedback_text", ""),
            test_data.get("feedback_text", ""),
        ),
        "passed_count": test_data.get("passed_count", 0),
        "total_count": test_data.get("total_count", 0),
        "case_results": test_data.get("case_results", []),
    }


@transaction.atomic
def create_and_evaluate_submission(*, user, task, code, hints_used=0, time_spent=0):
    submission = Submission.objects.create(
        user=user,
        task=task,
        code=code,
        hints_used=hints_used,
        time_spent=time_spent,
        difficulty_at_submission=task.difficulty_level,
        status="running",
    )

    ast_rules = task.ast_rules.all()
    test_cases = task.test_cases.all().order_by("order", "id")

    ast_data = evaluate_ast_rules(code, ast_rules)
    test_data = run_test_cases(code, test_cases)

    submission.ast_result = ast_data["ast_result"]
    submission.test_result = test_data["test_result"]
    submission.feedback_text = _build_feedback_text(
        ast_data.get("feedback_text", ""),
        test_data.get("feedback_text", ""),
    )
    submission.status = "done"
    submission.save(
        update_fields=[
            "ast_result",
            "test_result",
            "feedback_text",
            "status",
        ]
    )

    update_task_progress_from_submission(submission)
    return submission
