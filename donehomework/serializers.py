from rest_framework import serializers
from .models import DoneHomework


class DoneHomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoneHomework
        fields = ['user', 'homework', 'url']
