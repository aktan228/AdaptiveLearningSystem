from django.db import models
from apps.courses.models import Task

class Hints(models.Model):
    LEVELS = [(1,'Conceptual'), (2,'Logical'),(3,'Structural')]

    task = models.ForeignKey(Task, on_delete=models.CASCADE,related_name='hints')

    level = models.IntegerField(choices=LEVELS)

    content = models.TextField()

    class Meta:
        ordering = ['level']

    def __str__(self):
        return f'Hint L{self.level} for Task {self.task}'