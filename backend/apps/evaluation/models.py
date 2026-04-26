from django.db import models
from apps.courses.models import Task
from django.conf import settings

class TestCase(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='test_cases')
    
    input_data = models.TextField()
    expected_output  = models.TextField()
    is_hidden  = models.BooleanField(default=False)

    order = models.PositiveIntegerField(default=0)
    def __str__(self):
        return f'TestCase for task {self.task.id}'
    
class ASTRule(models.Model):
    task = models.ForeignKey(Task,on_delete=models.CASCADE,related_name='ast_rules')

    construct_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_forbidden = models.BooleanField(default=False)

    def __str__(self):
        kind = 'FORBIDDEN' if self.is_forbidden else 'REQUIRED' 
        return f'[{kind}] {self.construct_name}'

class Submission(models.Model):
    STATUS_CHOICES = [
        ('pending','Pending'),
        ('running','Running'),
        ('done','Done'),
        ('failed','Failed')
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='submissions')

    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='submissions')

    code = models.TextField()
    status = models.CharField(max_length=10,choices=STATUS_CHOICES,default='pending')
    test_result = models.BooleanField(null=True)
    ast_result = models.BooleanField(null=True)
    hints_used = models.PositiveIntegerField(default=0)
    time_spent = models.PositiveIntegerField(default=0)
    submitted_at = models.DateTimeField(auto_now_add=True)
    feedback_text = models.TextField(blank=True)
    difficulty_at_submission = models.CharField(max_length=10,choices=Task.DIFFICULTY,blank=True)

    def __str__(self):
        return f'Submission {self.id} by {self.user.username}'
    
    