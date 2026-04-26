from django.db import models
from django_summernote.fields import SummernoteTextField

class Tag(models.Model):
    title = models.CharField(max_length=50,unique=True)
    
    def __str__(self):
        return self.title
    
    
class Module(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    tags = models.ManyToManyField(Tag,related_name='modules',blank=True)
    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
    
class Lesson(models.Model):
    module = models.ForeignKey(Module, related_name='lessons', on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    content_html = SummernoteTextField() #rich text via Summernote
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        constraints = [
            models.UniqueConstraint(fields=['module','order'],name='unique_lesson_order_in_module') #
        ]

    def __str__(self):
        return self.title
    
class Task(models.Model):
    DIFFICULTY = [('easy','Easy'), ('medium','Medium'),('hard','Hard')]

    lesson = models.ForeignKey(Lesson,on_delete=models.CASCADE, related_name='tasks')

    title = models.CharField(max_length=100)
    description = models.TextField()
    difficulty_level = models.CharField(max_length=10,choices=DIFFICULTY,default='easy')
    time_limit_seconds = models.PositiveIntegerField(default=300) #5 minutes default

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['lesson','difficulty_level'],name='unique_task_difficulty_per_lesson') #
        ]
    def __str__(self):
        return f'[{self.difficulty_level} {self.title}]'
    
