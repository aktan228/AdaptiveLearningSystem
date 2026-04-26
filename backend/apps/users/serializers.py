from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, UserProfile

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'},required=True,write_only=True)

    class Meta: 
        model = User
        fields = ['username','password','email']
        extra_kwargs = {
            'email':{'required':True},
            'password': {'write_only':True}}
    
    def validate_password(self,value):
        try:
            validate_password(value)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value
    
    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data["email"],
            username = validated_data['username'],
            password = validated_data['password']
        )

class UserSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='profile.display_name',read_only=True)
    avatar_url = serializers.URLField(source='profile.avatar_url',read_only=True)
    full_name = serializers.CharField(read_only=True)
    class Meta:
        model = User  
        fields = ["id", "email", "username", "role", "full_name", "display_name", "avatar_url", "created_at"]


class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            "email",
            "username",
            "display_name",
            "avatar_url",
            "bio",
            "threshold_easy",
            "threshold_hard",
            "is_premium",
            "premium_until",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["is_premium", "premium_until", "created_at", "updated_at"]

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["display_name", "avatar_url", "bio", "threshold_easy", "threshold_hard"]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        token['role'] = user.role
        return token
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data