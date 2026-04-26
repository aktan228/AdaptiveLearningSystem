from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Lesson, Module
from .serializers import LessonDetailSerializer, ModuleDetailSerializer, ModuleListSerializer

class ModuleListView(generics.ListAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleListSerializer
    permission_classes = [AllowAny]
    
class ModuleDetailView(generics.RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleDetailSerializer
    permission_classes = [AllowAny]

class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonDetailSerializer
    permission_classes = [AllowAny]
