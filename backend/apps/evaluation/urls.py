from django.urls import path

from .views import RunCodeView, SubmissionCreateView, SubmissionListView, SubmissionDetailView

urlpatterns = [
    path('submit/',SubmissionCreateView.as_view()),
    path('run/',RunCodeView.as_view()),
    path('submission/',SubmissionListView.as_view()),
    path('submission/<int:pk>',SubmissionDetailView.as_view())
]
