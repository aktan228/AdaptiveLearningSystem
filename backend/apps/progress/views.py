from rest_framework import generics, permissions
from rest_framework.response import Response

from apps.courses.models import Lesson, Task

from .models import UserLessonProgress, UserTaskProgress
from .serializers import (
    DashboardSerializer,
    UserLessonProgressSerializer,
    UserTaskProgressSerializer,
)


class UserLessonProgressListView(generics.ListAPIView):
    serializer_class = UserLessonProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserLessonProgress.objects.filter(user=self.request.user).select_related(
            "lesson",
            "lesson__module",
        )


class UserTaskProgressListView(generics.ListAPIView):
    serializer_class = UserTaskProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserTaskProgress.objects.filter(user=self.request.user).select_related(
            "task",
            "task__lesson",
            "task__lesson__module",
            "best_submission",
        )


class DashboardView(generics.GenericAPIView):
    serializer_class = DashboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        data = {
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
        }

        serializer = self.get_serializer(data)
        return Response(serializer.data)
