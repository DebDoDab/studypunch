from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import viewsets
from.models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        group_id = self.request.user.group_id
        queryset = User.objects.filter(group_id=group_id)
        return queryset
