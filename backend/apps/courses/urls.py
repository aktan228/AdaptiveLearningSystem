from django.urls import path

from .views import ModuleListView, LessonDetailView, ModuleDetailView

urlpatterns = [
    path('modules/',ModuleListView.as_view()),
    path('modules/<int:pk>', ModuleDetailView.as_view()),
    path('lessons/<int:pk>',LessonDetailView.as_view())
]