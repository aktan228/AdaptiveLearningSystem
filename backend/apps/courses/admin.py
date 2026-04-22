from django.contrib import admin
from .models import Tags, Module, Lesson,Task

admin.site.register(Tags)
admin.site.register(Module)
admin.site.register(Lesson)
admin.site.register(Task)