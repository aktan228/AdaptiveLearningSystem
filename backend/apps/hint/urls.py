from django.urls import path

from .views import TaskHintListView

urlpatterns = [
    path("tasks/<int:task_id>/", TaskHintListView.as_view(), name="task-hints"),
]
