from django.db import models
from groups.models import Group


class Subject(models.Model):
    """Model for subjects (e.g. math)"""
    name = models.CharField(max_length=32, verbose_name="Name of the subject")
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name="Link to the adjacent group")
    color = models.CharField(
        max_length=7,
        default="#123456",
        verbose_name="Color of the subject in hex (e.g. '#123456')",
    )

    def __str__(self):
        return self.name
