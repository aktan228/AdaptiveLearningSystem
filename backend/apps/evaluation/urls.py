from django.urls import path

from .views import SubmissionCreateView, SubmissionListView, SubmissionDetailView

urlpatterns = [
    path('submit/',SubmissionCreateView.as_view(), name="submission-create"),
    path('submission/',SubmissionListView.as_view(), name="submission-list"),
    path('submission/<int:pk>',SubmissionDetailView.as_view(), name="submission-detail")
]
