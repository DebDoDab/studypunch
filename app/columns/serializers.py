from columns.models import Column
from rest_framework import serializers
from .models import Column


class ColumnSerializer(serializers.ModelSerializer):
    """Serializer for Column model"""
    group_id = serializers.IntegerField(write_only=True)
    less_than = serializers.IntegerField()

    class Meta:
        model = Column
        fields = ['id', 'name', 'less_than', 'url', 'group_id']
