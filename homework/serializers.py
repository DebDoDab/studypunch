from rest_framework import serializers
from .models import Homework
from subjects.serializers import SubjectSerializer


class HomeworkSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(many=False, read_only=False)

    class Meta:
        model = Homework
        fields = ['id', 'isImportant', 'deadline', 'subject', 'name', 'description', 'url']
