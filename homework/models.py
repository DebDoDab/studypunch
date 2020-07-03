from django.db import models
from groups.models import Group
from subjects.models import Subject
from django.utils import timezone


class Homework(models.Model):
    """Model for group's deadlines (e.g. do math's hw #4 until 26 May 2020)"""
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name="Link to the adjacent group")
    is_important = models.BooleanField(default=False, verbose_name="Is deadline hard or soft")
    deadline = models.DateField(default=timezone.now, verbose_name="Date of the deadlines")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name="Link to the adjacent subject")
    name = models.CharField(max_length=32, verbose_name="Homework's name (e.g. math hw #4)")
    description = models.CharField(max_length=512, default="", verbose_name="Homework's description")
    # TODO add comment section for users

    def __str__(self):
        return self.name
