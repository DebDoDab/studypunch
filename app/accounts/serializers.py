from rest_framework import serializers
from .models import User
from groups.serializers import GroupSerializer


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    group = GroupSerializer(many=False, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True, min_length=8)
    # group token is a unique string, we use it to give them to users for registration in that group
    group_token = serializers.CharField(max_length=32, write_only=True)

    def create(self, validated_data):
        print(validated_data)
        validated_data['group'] = validated_data['group_token']
        validated_data.pop('group_token')
        return User.objects.create_user(**validated_data)

    class Meta:
        model = User
        fields = ['id', 'username', 'group', 'url', 'password', 'group_token']
