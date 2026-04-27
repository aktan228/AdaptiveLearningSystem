from apps.hint.models import Hints


def get_task_hints_queryset(task_id):
    return Hints.objects.filter(task_id=task_id).select_related("task").order_by("level", "id")


def get_task_hints(task_id):
    return list(get_task_hints_queryset(task_id))


def get_next_hint(task_id, used_hints_count=0):
    hints = get_task_hints(task_id)

    if used_hints_count < 0:
        used_hints_count = 0

    if used_hints_count >= len(hints):
        return None

    return hints[used_hints_count]
