from django.db import models
from groups.models import Group
from subjects.models import Subject
from django.utils import timezone


class Homework(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    isImportant = models.BooleanField(default=False)
    deadline = models.DateField(default=timezone.now)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=512, default="")
    # TODO add comments

    def __str__(self):
        return self.name
