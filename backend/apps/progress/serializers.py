from rest_framework import serializers

from .models import UserLessonProgress, UserTaskProgress


class UserTaskProgressSerializer(serializers.ModelSerializer):
    task_title = serializers.CharField(source="task.title", read_only=True)
    lesson_id = serializers.IntegerField(source="task.lesson.id", read_only=True)
    lesson_title = serializers.CharField(source="task.lesson.title", read_only=True)
    difficulty_level = serializers.CharField(source="task.difficulty_level", read_only=True)

    class Meta:
        model = UserTaskProgress
        fields = [
            "id",
            "task",
            "task_title",
            "lesson_id",
            "lesson_title",
            "difficulty_level",
            "is_solved",
            "attempt_count",
            "solved_at",
            "updated_at",
            "last_submission_at",
            "best_submission",
        ]


class UserLessonProgressSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(source="lesson.title", read_only=True)
    module_id = serializers.IntegerField(source="lesson.module.id", read_only=True)
    module_title = serializers.CharField(source="lesson.module.title", read_only=True)

    class Meta:
        model = UserLessonProgress
        fields = [
            "id",
            "lesson",
            "lesson_title",
            "module_id",
            "module_title",
            "is_completed",
            "started_at",
            "updated_at",
            "completed_at",
        ]


class DashboardSerializer(serializers.Serializer):
    total_lessons = serializers.IntegerField()
    completed_lessons = serializers.IntegerField()
    total_tasks = serializers.IntegerField()
    solved_tasks = serializers.IntegerField()
    total_easy_tasks = serializers.IntegerField()
    total_medium_tasks = serializers.IntegerField()
    total_hard_tasks = serializers.IntegerField()
    solved_easy_tasks = serializers.IntegerField()
    solved_medium_tasks = serializers.IntegerField()
    solved_hard_tasks = serializers.IntegerField()
    active_days = serializers.IntegerField()
    current_streak = serializers.IntegerField()
    max_streak = serializers.IntegerField()
    recent_submissions = serializers.ListField(
        child=serializers.DictField(),
    )
