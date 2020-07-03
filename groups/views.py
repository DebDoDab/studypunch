from rest_framework.permissions import AllowAny

from .serializers import GroupSerializer
from rest_framework import viewsets
from.models import Group


class GroupViewSet(viewsets.ModelViewSet):
    """ViewSet for Group model"""
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes_by_action = {'create': [AllowAny]}

    def get_permissions(self):
        try:
            # we allow creating groups everybody
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # otherwise using default permission
            return [permission() for permission in self.permission_classes]
