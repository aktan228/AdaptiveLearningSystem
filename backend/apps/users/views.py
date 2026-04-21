from rest_framework import generics,permissions # эти классы предоставляют базовые представления для создания, получения, обновления и удаления объектов
# а также для управления разрешениями доступа к этим представлениям. Например, generics.CreateAPIView позволяет создавать новые объекты
# а permissions.IsAuthenticated обеспечивает доступ только для аутентифицированных пользователей.
from rest_framework.permissions import AllowAny # этот класс разрешает доступ к представлению всем пользователям, независимо от их аутентификации
#Я использую его для представлений, которые должны быть доступны без входа в систему, таких как регистрация и вход в систему.
from rest_framework_simplejwt.views import TokenObtainPairView # этот класс предоставляет представление для получения пары токенов доступа и обновления JWT-токенов
#Я использую его для реализации функционала входа в систему, позволяя пользователям получать JWT-токены после успешной аутентификации, которые они могут использовать для доступа к защищенным ресурсам моего API.


from .serializers import UserRegistrationSerializer, UserProfileSerializer, UserProfileUpdateSerializer,UserSerializer,MyTokenObtainPairSerializer
from .models import User
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    
class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "PUT"]:
            return UserProfileUpdateSerializer
        return UserProfileSerializer

    def get_object(self):
        return self.request.user.profile
    
class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer