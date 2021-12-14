from .serializers import ColumnSerializer
from rest_framework import viewsets
from .models import Column


class ColumnViewSet(viewsets.ModelViewSet):
    """ViewSet for Column model"""
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

    def get_queryset(self):
        group_id = self.request.user.group_id
        queryset = Column.objects.filter(group_id=group_id)
        return queryset
