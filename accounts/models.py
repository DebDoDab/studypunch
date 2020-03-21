from django.db import models
from django.contrib.auth.models import UserManager, AbstractUser
from homework.models import Homework
from groups.models import Group
from django.contrib.auth.management.commands.createsuperuser import Command


class MyUserManager(UserManager):
    def _create_user(self, username, email, password, group_id=None, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        group_id = extra_fields.pop('group')
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, group=Group.objects.get(id=group_id), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    doneHomework = models.ManyToManyField(Homework)

    REQUIRED_FIELDS = ['group', 'email']
    objects = MyUserManager()

