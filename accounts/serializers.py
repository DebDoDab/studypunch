from rest_framework import serializers
from .models import User
from groups.serializers import GroupSerializer


class UserSerializer(serializers.ModelSerializer):
    group = GroupSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'group', 'url']
