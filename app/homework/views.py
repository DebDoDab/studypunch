from .serializers import HomeworkSerializer
from rest_framework import viewsets
from .models import Homework


class HomeworkViewSet(viewsets.ModelViewSet):
    """ViewSet for Homework model"""
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer

    def get_queryset(self):
        group_id = self.request.user.group_id
        queryset = Homework.objects.filter(group_id=group_id)

        subject_id = self.request.query_params.get('subject_id', None)
        if subject_id:
            return queryset.filter(subject_id=subject_id)
        return queryset
