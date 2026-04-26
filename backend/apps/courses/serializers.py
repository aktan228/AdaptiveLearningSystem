from rest_framework import serializers

from .models import Tag, Module, Lesson, Task


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "title"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", "description", "difficulty_level", "time_limit_seconds"]


class LessonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ["id", "title", "order"]


class LessonDetailSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = ["id", "module", "title", "content_html", "tasks", "order"]


class ModuleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ["id", "title", "description", "order"]


class ModuleDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    lessons = LessonListSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ["id", "title", "description", "tags", "lessons", "order"]
