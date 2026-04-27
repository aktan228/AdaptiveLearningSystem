from django.urls import path

from .views import DashboardView, LessonCompleteView, UserLessonProgressListView, UserTaskProgressListView

urlpatterns = [
    path("lessons/", UserLessonProgressListView.as_view(), name="progress-lessons"),
    path("lessons/<int:lesson_id>/complete/", LessonCompleteView.as_view(), name="progress-lesson-complete"),
    path("tasks/", UserTaskProgressListView.as_view(), name="progress-tasks"),
    path("dashboard/", DashboardView.as_view(), name="progress-dashboard"),
]
