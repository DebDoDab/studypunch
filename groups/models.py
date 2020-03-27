from django.db import models
from django.utils.crypto import get_random_string


class GroupManager(models.Manager):
    def create(self, name, token=""):
        group = super().create(name=name, token=Group.generateToken())
        return group


class Group(models.Model):
    name = models.CharField(max_length=32)
    token = models.CharField(max_length=32)

    objects = GroupManager()

    def __str__(self):
        return self.name

    @staticmethod
    def createAdminGroup():
        token = Group.generateToken()
        group = Group.objects.create(name="admin")

    @staticmethod
    def generateToken():
        token = get_random_string(32)
        while Group.objects.filter(token=token).exists():
            token = get_random_string(32)
        return token

    def updateToken(self):
        self.token = self.generateToken()
