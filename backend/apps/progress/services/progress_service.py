from django.utils import timezone

from apps.courses.models import Lesson
from apps.progress.models import UserLessonProgress, UserTaskProgress


def update_task_progress_from_submission(submission):
    progress, _ = UserTaskProgress.objects.get_or_create(
        user=submission.user,
        task=submission.task,
    )
    progress.attempt_count += 1
    progress.last_submission_at = submission.submitted_at

    if submission.ast_result and submission.test_result:
        progress.is_solved = True
        progress.solved_at = progress.solved_at or timezone.now()
        progress.best_submission = submission

    progress.save(
        update_fields=[
            "attempt_count",
            "last_submission_at",
            "is_solved",
            "solved_at",
            "best_submission",
            "updated_at",
        ]
    )

    update_lesson_progress_for_user(submission.user, submission.task.lesson)
    return progress


def update_lesson_progress_for_user(user, lesson):
    progress, _ = UserLessonProgress.objects.get_or_create(
        user=user,
        lesson=lesson,
    )

    lesson_tasks = lesson.tasks.all()
    total_tasks = lesson_tasks.count()
    solved_tasks = UserTaskProgress.objects.filter(
        user=user,
        task__lesson=lesson,
        is_solved=True,
    ).count()

    is_completed = progress.is_completed or (total_tasks > 0 and solved_tasks == total_tasks)
    progress.is_completed = is_completed
    progress.completed_at = timezone.now() if is_completed else None
    progress.save(update_fields=["is_completed", "completed_at", "updated_at"])
    return progress


def mark_lesson_complete_for_user(user, lesson_id):
    lesson = Lesson.objects.get(id=lesson_id)
    progress, _ = UserLessonProgress.objects.get_or_create(
        user=user,
        lesson=lesson,
    )
    progress.is_completed = True
    progress.completed_at = progress.completed_at or timezone.now()
    progress.save(update_fields=["is_completed", "completed_at", "updated_at"])
    return progress
