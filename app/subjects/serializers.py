from groups.models import Group
from rest_framework import serializers
from .models import Subject


class SubjectSerializer(serializers.ModelSerializer):
    """Serializer for Subject model"""
    group_id = serializers.IntegerField(write_only=True)
    color = serializers.CharField(max_length=7, default="#123456")

    def create(self, validated_data):
        validated_data['group'] = Group.objects.get(id=validated_data.get('group_id'))
        validated_data.pop('group_id')
        return Subject.objects.create(**validated_data)

    class Meta:
        model = Subject
        fields = ['id', 'name', 'color', 'url', 'group_id']
