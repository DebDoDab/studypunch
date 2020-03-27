from rest_framework import serializers
from .models import Group


class GroupSerializer(serializers.ModelSerializer):
    token = serializers.CharField(read_only=True)

    def create(self, validated_data):
        return Group.objects.create(**validated_data)

    class Meta:
        model = Group
        fields = ['id', 'name', 'token', 'url']
