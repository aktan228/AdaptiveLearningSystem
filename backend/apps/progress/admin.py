from django.contrib import admin
from .models import UserLessonProgress, UserTaskProgress

admin.site.register(UserLessonProgress)
admin.site.register(UserTaskProgress)
