from django.urls import path

from .views import DashboardView, UserLessonProgressListView, UserTaskProgressListView

urlpatterns = [
    path("lessons/", UserLessonProgressListView.as_view(), name="progress-lessons"),
    path("tasks/", UserTaskProgressListView.as_view(), name="progress-tasks"),
    path("dashboard/", DashboardView.as_view(), name="progress-dashboard"),
]
