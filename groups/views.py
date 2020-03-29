from django.shortcuts import render
from rest_framework.permissions import AllowAny

from .serializers import GroupSerializer
from rest_framework import viewsets
from.models import Group


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes_by_action = {'create': [AllowAny]}

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]
