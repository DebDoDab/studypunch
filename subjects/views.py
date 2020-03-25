from django.shortcuts import render
from .serializers import SubjectSerializer
from rest_framework import viewsets
from.models import Subject


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def get_queryset(self):
        group_id = self.request.user.group_id
        queryset = Subject.objects.filter(group_id=group_id)
        return queryset
