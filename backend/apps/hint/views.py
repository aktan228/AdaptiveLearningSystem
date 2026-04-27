from rest_framework import generics, permissions

from .serializers import HintSerializer
from .services import get_task_hints_queryset


class TaskHintListView(generics.ListAPIView):
    serializer_class = HintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return get_task_hints_queryset(self.kwargs["task_id"])
