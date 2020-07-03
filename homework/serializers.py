from rest_framework import serializers
from .models import Homework
from groups.models import Group
from subjects.models import Subject
from subjects.serializers import SubjectSerializer


class HomeworkSerializer(serializers.ModelSerializer):
    """Serializer for Homework model"""
    subject = SubjectSerializer(many=False, read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    group_id = serializers.IntegerField(write_only=True)
    description = serializers.CharField(allow_blank=True)

    def create(self, validated_data):
        validated_data['group'] = Group.objects.get(id=validated_data.get('group_id'))
        validated_data.pop('group_id')
        validated_data['subject'] = Subject.objects.get(id=validated_data.get('subject_id'))
        validated_data.pop('subject_id')
        return Homework.objects.create(**validated_data)

    class Meta:
        model = Homework
        fields = ['id', 'is_important', 'deadline', 'subject', 'name', 'description', 'url', 'subject_id', 'group_id']
