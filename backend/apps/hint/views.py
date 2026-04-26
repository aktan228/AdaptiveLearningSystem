from rest_framework import generics, permissions

from .models import Hints
from .serializers import HintSerializer


class TaskHintListView(generics.ListAPIView):
    serializer_class = HintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Hints.objects.filter(task_id=self.kwargs["task_id"]).select_related("task")
