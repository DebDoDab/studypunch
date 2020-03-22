from django.db import models
from django.utils.crypto import get_random_string


class Group(models.Model):
    name = models.CharField(max_length=32)
    token = models.CharField(max_length=32)

    def __str__(self):
        return self.name

    @staticmethod
    def createAdminGroup():
        token = Group.generateToken()
        try:
            group = Group.objects.get(name='admin', token=token)
        except Group.DoesNotExist:
            group = Group.objects.create(name='admin', token=token)
        return group.id

    @staticmethod
    def generateToken():
        token = get_random_string(32)
        while Group.objects.filter(token=token).exists():
            token = get_random_string(32)
        return token

    def updateToken(self):
        self.token = self.generateToken()
