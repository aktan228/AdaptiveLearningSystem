
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('summernote/', include('django_summernote.urls')), # нужен для админки, чтобы можно было редактировать текст с помощью визуального редактора
    # JWT Auth
    path('api/auth/login/', TokenObtainPairView.as_view()), # для получения access и refresh токенов при логине
    path('api/auth/refresh/', TokenRefreshView.as_view()), # для получения нового access токена при истечении срока действия старого, используя refresh токен
    # App APIs
    path('api/users/', include('apps.users.urls')), 
    path('api/courses/', include('apps.courses.urls')),
    path('api/evaluation/', include('apps.evaluation.urls')),
    path('api/hints/', include('apps.hints.urls')),
    path('api/progress/', include('apps.progress.urls')),
]

