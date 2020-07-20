from django.db import models
from django.utils.crypto import get_random_string


class GroupManager(models.Manager):
    """Manager for creating Group instances"""
    def create(self, name):
        group = super().create(name=name, token=Group.generateToken())
        return group


class Group(models.Model):
    """User's group in university/school"""
    name = models.CharField(max_length=32, verbose_name="Group's name (e.g. M3105)")
    token = models.CharField(max_length=32, unique=True, verbose_name="Group's token for invitation new users")

    objects = GroupManager()

    def __str__(self):
        return self.name

    @staticmethod
    def createAdminGroup():
        group = Group.objects.create(name="admin")
        return group

    @staticmethod
    def generateToken():
        # generating unique token
        token = get_random_string(32)
        while Group.objects.filter(token=token).exists():
            token = get_random_string(32)
        return token

    def updateToken(self):
        self.token = self.generateToken()
