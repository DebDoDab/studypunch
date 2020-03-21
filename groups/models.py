from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=32)

    @staticmethod
    def createAdminGroup():
        try:
            group = Group.objects.get(name='admin')
        except Group.DoesNotExist:
            group = Group.objects.create(name='admin')
        return group.id
