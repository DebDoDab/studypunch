from django.db import models
from accounts.models import User
from homework.models import Homework


class DoneHomework(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    homework = models.ForeignKey(Homework, on_delete=models.CASCADE)
