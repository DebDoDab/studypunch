from django.db import models
from groups.models import Group


class Column(models.Model):
    """Model for column (e.g. <1 week)"""
    name = models.CharField(max_length=32, verbose_name="Name of the column")
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name="Link to the adjacent group")
    less_than = models.IntegerField(verbose_name="Homeworks with deadline in less than less_than days would be in "
                                                 "this column")

    def __str__(self):
        return self.name
