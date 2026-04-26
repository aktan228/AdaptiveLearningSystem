from rest_framework import serializers

from .models import Hints


class HintSerializer(serializers.ModelSerializer):
    task_title = serializers.CharField(source="task.title", read_only=True)

    class Meta:
        model = Hints
        fields = [
            "id",
            "task",
            "task_title",
            "level",
            "content",
        ]
