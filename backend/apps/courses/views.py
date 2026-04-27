from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Lesson, Module, Task
from .serializers import (
    LessonDetailSerializer,
    ModuleDetailSerializer,
    ModuleListSerializer,
    TaskDetailSerializer,
)


class ModuleListView(generics.ListAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleListSerializer
    permission_classes = [AllowAny]


class ModuleDetailView(generics.RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleDetailSerializer
    permission_classes = [AllowAny]


class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonDetailSerializer
    permission_classes = [AllowAny]


class TaskDetailView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskDetailSerializer
    permission_classes = [AllowAny]
