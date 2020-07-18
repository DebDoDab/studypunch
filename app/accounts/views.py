from rest_framework.permissions import AllowAny

from .serializers import UserSerializer
from rest_framework import viewsets
from .models import User


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model"""
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes_by_action = {'create': [AllowAny]}

    def get_queryset(self):
        group_id = self.request.user.group_id
        queryset = User.objects.filter(group_id=group_id)
        return queryset

    def get_permissions(self):
        try:
            # we allow creating users everybody
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # if it's not creating we use default permission classes
            return [permission() for permission in self.permission_classes]
