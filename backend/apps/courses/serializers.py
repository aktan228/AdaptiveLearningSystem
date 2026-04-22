from rest_framework import serializers

from .models import Tags, Module, Lesson, Task

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ['id','title']
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title','description','difficulty_level','time_limit_seconds']
        
class LessonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id','title','order']
        
class LessonDetailSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True,read_only=True)
    
    class Meta:
        model = Lesson
        fields = ['module','title','content_html','task','order']
        
class ModuleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['id','title','description','order']
        
class ModuleDetailSerializer(serializers.ModelSerializer):
    tags = TagsSerializer(many=True,read_only=True)
    lesson = LessonListSerializer(many=True,read_only=True)
    class Meta:
        model = Module
        fields = ['title','description','tags','lesson','order']