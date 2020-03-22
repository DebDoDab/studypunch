from django.shortcuts import render
from .serializers import HomeworkSerializer
from rest_framework import viewsets
from.models import Homework


class HomeworkViewSet(viewsets.ModelViewSet):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer

