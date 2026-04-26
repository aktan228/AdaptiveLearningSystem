from django.urls import path

from .views import SubmissionCreateView, SubmissionListView, SubmissionDetailView

urlpatterns = [
    path('submit/',SubmissionCreateView.as_view()),
    path('submission/',SubmissionListView.as_view()),
    path('submission/<int:pk>',SubmissionDetailView.as_view())
]
