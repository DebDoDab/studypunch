from django.shortcuts import render
from .serializers import GroupSerializer
from rest_framework import viewsets
from.models import Group


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

