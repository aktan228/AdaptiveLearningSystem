from rest_framework import generics,permissions

from .serializers import SubmissionCreateSerializer, SubmissionListSerializer, SubmissionSerializer
from .models import Submission

class SubmissionListView(generics.ListAPIView):
    serializer_class = SubmissionListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self): # используется когда нужно предоставить данные с некоторыми услованиям это невозможно если использовать аттрибу queryset=submission.objects.all() тк чтобы написать условие нужно писать self.request а это невозможно при атрибуте класса
        return Submission.objects.filter(user=self.request.user).order_by('-submitted_at')
class SubmissionCreateView(generics.CreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self,serializer):
        task = serializer.validated_data['task']
        serializer.save(
            user=self.request.user,
            status='pending',
            difficulty_at_submission = task.difficulty_level
        )
    
class SubmissionDetailView(generics.RetrieveAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    # queryset это все объекты модели Submission, а serializer_class - это класс сериализатора, который будет использоваться для преобразования объектов Submission в формат JSON и обратно.
    # queryset это что то готового sql запроса который основывается на моей модели и данных в ней и запустится только при каком нибудь действии на сервер например  user отправит запрос на отправку submission и в этот момент мы обратимся к базе
    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user) # filter = where из sql 
    # Python: Submission.objects.filter(status="pending")
    # SQL: SELECT * FROM submissions WHERE status = 'pending';  