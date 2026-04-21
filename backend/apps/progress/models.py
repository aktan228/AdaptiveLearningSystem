from django.db import models
from django.conf import settings
from apps.courses.models import Lesson

class UserLessonProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='lesson progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateField(null=True,blank=True)

    class Meta:
        unique_together = ('user','lesson')

    def __str__(self):
        status = 'DONE' if self.is_completed else 'IN PROGRESS'
        return f'{self.user.username} - {self.lesson.title} [{status}]'
    