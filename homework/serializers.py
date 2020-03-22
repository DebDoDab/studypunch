from rest_framework import serializers
from .models import Homework


class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ['group', 'isImportant', 'deadline', 'subject', 'name', 'description', 'url']
