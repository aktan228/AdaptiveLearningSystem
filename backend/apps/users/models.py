from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email,username=username,**extra)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password, **extra):
        extra.setdefault('is_staff',True)
        extra.setdefault('is_superuser',True)
        extra.setdefault('role','admin')
        return self.create_user(email,username,password,**extra)
    
class User(AbstractBaseUser,PermissionsMixin):
    ROLE_CHOICES = [('student','Student'),('admin','Admin')]

    username = models.CharField(max_length=150,unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10,choices=ROLE_CHOICES,default='student')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    avatar_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True,null=True)
    total_tasks_completed = models.IntegerField(default=0)
    current_streak = models.IntegerField(default=0)
    last_active = models.DateTimeField(blank=True,null=True)
    threshold_easy = models.FloatField(default=0.4)
    threshold_hard = models.FloatField(default=0.8)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f'{self.username} ({self.role})'
    