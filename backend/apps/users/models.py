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

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta: # это вложенный класс котгорый необходим чтобы более подробнее настроить поведение модели. модель является не обязательной
        db_table = 'users' # названи таблицы в ДБ
        verbose_name = 'User' # человеко понятное название модели
        verbose_name_plural = 'Users' # тот же verbose_name но его множественная версия
        ordering = ['-created_at'] # сортировка. в данном примере он будет сортировать от самого нового до самого старого. ordering всегда должен быть списком или кортежем
        indexes = [ # индексы рекомендуются тк дают почти мгновенный доступ к полям в ДБ, но имеют ряд минусов (таких как: замедление операций (да странно) тк при добавление или удаление пользователя нужно менять саму таблицу и индекс (но звучит как фигня), место на диске тк диски это отдельные файлы) 
                    # КРЧ надо еще подробнее изучить индексы но в контексте sql а не в django
                    # надо использовать только при необходимости
                    models.Index(fields=['email']),
                    models.Index(fields=['username']),
                    models.Index(fields=['created_at'])

        ]        
    def __str__(self): #патоновская функция которая представляет текстовое представления объекта. когда я пишу model_name.objects.all() он ищет именно __str__ функцию
                            # если у функции есть двойные подчеркивания это значит что функия является встроенной в сам язык и нужно это чтобы не переписать такую функцию
                            # это назыается магической функцией
            return f"{self.username} ({self.email})"
        
    @property # декоратор property позволяет превратить функцию в атрибут Вызов: obj.name вместо obj.name()
                  # декоратор это надстройка которая повзволяет расширить функцию не переписывая ее
    def full_name(self): # функция для получения полного именни из профиля пользователя
        if hasattr(self, 'profile') and self.profile.display_name: # функция hasattr (has attribute) выводит true есил внутри 1 аргумента(это всегда объект) есть 2 атрибут, в наше случае идет проверка на то что есть ли у user связь между профилем, дальше если есть связь идет проверка на то что есть ли display_name уже внутри самого profile
            return self.profile.display_name
        return self.username # типа fallback-а на тот случай если у пользователя нету profile
        

    

class UserProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    display_name = models.CharField(max_length=100, blank=True)
    avatar_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True,null=True)
    threshold_easy = models.FloatField(default=0.4)
    threshold_hard = models.FloatField(default=0.8)

    is_premium  = models.BooleanField(default=False)
    premium_until = models.DateTimeField(null=True, blank=True,)
    privacy_settings = models.JSONField(default=dict,blank=True) # это поле необходимости моего профиля # default=True при создание профиля создаст в этом поле пустой словарь {} что поможет избежать ошибок
    # JSONField как ни странно хранит в себе json формата файл что очень полезно для настроек приватности которые постоянно меняются (что помогает не делать постоянно миграции)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user_profiles'
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'

    def __str__(self):
        return f"Profile of {self.user.username}"
    
    def get_privacy_setting(self,key,default=True):
        return self.privacy_settings.get(key,default)
    
    def set_privacy_setting(self,key,value):
        self.privacy_settings[key] = value
        self.save(update_fields=['privacy_settings','updated_at'])