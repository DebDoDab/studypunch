from django.db import models
from accounts.models import User
from homework.models import Homework


class DoneHomework(models.Model):
    """Model for keeping done homework for every user"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Link to the adjacent user")
    homework = models.ForeignKey(Homework, on_delete=models.CASCADE, verbose_name="Link to the adjacent done homework")
