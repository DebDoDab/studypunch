from django.db import models
from groups.models import Group


class Homework(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    isImportant = models.BooleanField()
    deadline = models.DateField()
    # TODO add subject
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=512)
    # TODO add comments

    def __str__(self):
        return self.name
