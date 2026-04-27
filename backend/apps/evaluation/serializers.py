from rest_framework import serializers
from apps.courses.models import Task

from .models import Submission


class SubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ["task", "code", "hints_used", "time_spent"]


class RunCodeSerializer(serializers.Serializer):
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())
    code = serializers.CharField()


class CaseResultSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    order = serializers.IntegerField()
    is_hidden = serializers.BooleanField()
    passed = serializers.BooleanField()
    actual_output = serializers.CharField()
    expected_output = serializers.CharField()
    error_output = serializers.CharField()


class RunCodeResultSerializer(serializers.Serializer):
    status = serializers.CharField()
    task = serializers.IntegerField()
    test_result = serializers.BooleanField()
    ast_result = serializers.BooleanField()
    feedback_text = serializers.CharField()
    passed_count = serializers.IntegerField()
    total_count = serializers.IntegerField()
    case_results = CaseResultSerializer(many=True)


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            "id",
            "task",
            "code",
            "status",
            "test_result",
            "ast_result",
            "feedback_text",
            "hints_used",
            "time_spent",
            "difficulty_at_submission",
            "submitted_at",
        ]
        read_only_fields = [
            "test_result",
            "ast_result",
            "feedback_text",
            "status",
            "difficulty_at_submission",
            "submitted_at",
        ]


class SubmissionListSerializer(serializers.ModelSerializer):
    task_title = serializers.CharField(source="task.title", read_only=True)

    class Meta:
        model = Submission
        fields = [
            "id",
            "task",
            "task_title",
            "status",
            "test_result",
            "ast_result",
            "hints_used",
            "time_spent",
            "difficulty_at_submission",
            "submitted_at",
        ]
