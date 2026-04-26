from django.contrib import admin
from .models import Tag, Module, Lesson, Task

admin.site.register(Tag)
admin.site.register(Module)
admin.site.register(Lesson)
admin.site.register(Task)