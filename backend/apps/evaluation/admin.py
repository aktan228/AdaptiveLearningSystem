from django.contrib import admin
from .models import ASTRule, TestCase,Submission


admin.site.register(ASTRule)
admin.site.register(TestCase)
admin.site.register(Submission)