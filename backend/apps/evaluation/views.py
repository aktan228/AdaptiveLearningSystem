from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Submission
from .serializers import (
    RunCodeResultSerializer,
    RunCodeSerializer,
    SubmissionCreateSerializer,
    SubmissionListSerializer,
    SubmissionSerializer,
)
from .services import create_and_evaluate_submission, evaluate_code_preview


class SubmissionListView(generics.ListAPIView):
    serializer_class = SubmissionListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user).select_related("task").order_by("-submitted_at")


class SubmissionCreateView(generics.CreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        submission = create_and_evaluate_submission(
            user=request.user,
            task=serializer.validated_data["task"],
            code=serializer.validated_data["code"],
            hints_used=serializer.validated_data.get("hints_used", 0),
            time_spent=serializer.validated_data.get("time_spent", 0),
        )

        output_serializer = SubmissionSerializer(submission)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)


class RunCodeView(generics.GenericAPIView):
    serializer_class = RunCodeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = evaluate_code_preview(
            task=serializer.validated_data["task"],
            code=serializer.validated_data["code"],
        )

        output_serializer = RunCodeResultSerializer(result)
        return Response(output_serializer.data, status=status.HTTP_200_OK)


class SubmissionDetailView(generics.RetrieveAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user)
