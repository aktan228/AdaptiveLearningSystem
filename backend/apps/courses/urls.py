from django.urls import path

from .views import LessonDetailView, ModuleDetailView, ModuleListView, TaskDetailView

urlpatterns = [
    path("modules/", ModuleListView.as_view(), name="module-list"),
    path("modules/<int:pk>/", ModuleDetailView.as_view(), name="module-detail"),
    path("lessons/<int:pk>/", LessonDetailView.as_view(), name="lesson-detail"),
    path("tasks/<int:pk>/", TaskDetailView.as_view(), name="task-detail"),
]
