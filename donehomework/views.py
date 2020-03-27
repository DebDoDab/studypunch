from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DoneHomeworkSerializer
from .models import DoneHomework


class DoneHomeworkViewSet(viewsets.ModelViewSet):
    queryset = DoneHomework.objects.all()
    serializer_class = DoneHomeworkSerializer

    def get_queryset(self):
        queryset = DoneHomework.objects.all()
        user_id = self.request.query_params.get('user_id', None)

        if user_id:
            return queryset.filter(user_id=user_id)
        return queryset
