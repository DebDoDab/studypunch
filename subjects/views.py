from django.shortcuts import render
from .serializers import SubjectSerializer
from rest_framework import viewsets
from.models import Subject


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

