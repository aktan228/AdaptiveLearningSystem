from rest_framework import generics, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.courses.models import Lesson

from .models import UserLessonProgress, UserTaskProgress
from .serializers import (
    DashboardSerializer,
    UserLessonProgressSerializer,
    UserTaskProgressSerializer,
)
from .services import build_dashboard_data, mark_lesson_complete_for_user


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


class LessonCompleteView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, lesson_id, *args, **kwargs):
        get_object_or_404(Lesson, id=lesson_id)
        progress = mark_lesson_complete_for_user(request.user, lesson_id)
        serializer = UserLessonProgressSerializer(progress)
        return Response(serializer.data)


class DashboardView(generics.GenericAPIView):
    serializer_class = DashboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        data = build_dashboard_data(request.user)
        serializer = self.get_serializer(data)
        return Response(serializer.data)
