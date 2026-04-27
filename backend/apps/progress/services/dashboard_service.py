from apps.courses.models import Lesson, Task
from apps.evaluation.models import Submission
from apps.progress.models import UserLessonProgress, UserTaskProgress
from apps.progress.services.streak_service import calculate_streak_stats


def build_dashboard_data(user):
    streak_stats = calculate_streak_stats(user)
    recent_submissions = (
        Submission.objects.filter(user=user)
        .select_related("task", "task__lesson")
        .order_by("-submitted_at")[:5]
    )

    return {
        "total_lessons": Lesson.objects.count(),
        "completed_lessons": UserLessonProgress.objects.filter(
            user=user,
            is_completed=True,
        ).count(),
        "total_tasks": Task.objects.count(),
        "solved_tasks": UserTaskProgress.objects.filter(
            user=user,
            is_solved=True,
        ).count(),
        "total_easy_tasks": Task.objects.filter(difficulty_level="easy").count(),
        "total_medium_tasks": Task.objects.filter(difficulty_level="medium").count(),
        "total_hard_tasks": Task.objects.filter(difficulty_level="hard").count(),
        "solved_easy_tasks": UserTaskProgress.objects.filter(
            user=user,
            is_solved=True,
            task__difficulty_level="easy",
        ).count(),
        "solved_medium_tasks": UserTaskProgress.objects.filter(
            user=user,
            is_solved=True,
            task__difficulty_level="medium",
        ).count(),
        "solved_hard_tasks": UserTaskProgress.objects.filter(
            user=user,
            is_solved=True,
            task__difficulty_level="hard",
        ).count(),
        "active_days": streak_stats["active_days"],
        "current_streak": streak_stats["current_streak"],
        "max_streak": streak_stats["max_streak"],
        "recent_submissions": [
            {
                "id": submission.id,
                "task_id": submission.task_id,
                "task_title": submission.task.title,
                "lesson_id": submission.task.lesson_id,
                "lesson_title": submission.task.lesson.title,
                "status": submission.status,
                "test_result": submission.test_result,
                "ast_result": submission.ast_result,
                "difficulty_level": submission.difficulty_at_submission,
                "submitted_at": submission.submitted_at.isoformat(),
            }
            for submission in recent_submissions
        ],
    }
