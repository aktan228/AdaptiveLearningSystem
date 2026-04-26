from django.urls import path

from .views import ModuleListView, LessonDetailView, ModuleDetailView

urlpatterns = [
    path("modules/", ModuleListView.as_view(), name="module-list"),
    path("modules/<int:pk>/", ModuleDetailView.as_view(), name="module-detail"),
    path("lessons/<int:pk>/", LessonDetailView.as_view(), name="lesson-detail"),
]
