from django.urls import path

from .views import RegistrationView, UserProfileView, MyTokenObtainPairView

urlpatterns = [
    path('register/',RegistrationView.as_view()),
    path('login/',MyTokenObtainPairView.as_view()),
    path('me/',UserProfileView.as_view())
]
