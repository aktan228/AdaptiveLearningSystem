from rest_framework import serializers 
from .models import Submission

class SubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['task','code','hints_used','time_spent']

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            "id",
            "task",
            "code",
            'status'
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
            "difficulty_at_submission",
            "submitted_at",
        ]

class SubmissionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id','task','test_result','ast_result','submitted_at']
        
