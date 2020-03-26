from django.db import models
from groups.models import Group


class Subject(models.Model):
    name = models.CharField(max_length=32)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
