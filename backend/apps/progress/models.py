from django.conf import settings
from django.db import models

from apps.courses.models import Lesson, Task
from apps.evaluation.models import Submission


class UserLessonProgress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="lesson_progress",
    )
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name="user_progress",
    )
    is_completed = models.BooleanField(default=False)
    started_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "lesson"],
                name="unique_user_lesson_progress",
            )
        ]
        indexes = [
            models.Index(fields=["user", "lesson"]),
        ]

    def __str__(self):
        status = "DONE" if self.is_completed else "IN PROGRESS"
        return f"{self.user.username} - {self.lesson.title} [{status}]"


class UserTaskProgress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="task_progress",
    )
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name="user_progress",
    )
    is_solved = models.BooleanField(default=False)
    best_submission = models.ForeignKey(
        Submission,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="best_for_progress_records",
    )
    attempt_count = models.PositiveIntegerField(default=0)
    solved_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_submission_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "task"],
                name="unique_user_task_progress",
            )
        ]
        indexes = [
            models.Index(fields=["user", "task"]),
        ]

    def __str__(self):
        status = "DONE" if self.is_solved else "IN PROGRESS"
        return f"{self.user.username} - {self.task.title} [{status}]"
