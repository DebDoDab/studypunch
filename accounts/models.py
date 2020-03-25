from django.db import models
from django.contrib.auth.models import UserManager, AbstractUser
from homework.models import Homework
from groups.models import Group


class CustomUserManager(UserManager):
    def _create_user(self, username, email, password, group_id=None, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        group_id = extra_fields.pop('group')
        user = self.model(username=username, email=email, group=Group.objects.get(id=group_id), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractUser):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='users')
    doneHomework = models.ManyToManyField(Homework)

    REQUIRED_FIELDS = ['group', 'email']
    objects = CustomUserManager()
