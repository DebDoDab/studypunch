from django.db import models
from django.contrib.auth.models import UserManager, AbstractUser
from homework.models import Homework
from groups.models import Group


class CustomUserManager(UserManager):
    """Manager to create User instances"""
    def _create_user(self, username, email, password, group_id=None, **extra_fields):
        """Create and save a user with the given username, email, and password"""
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        if isinstance(username, str):
            username = username.lower()
        group_id = extra_fields.pop('group')
        if isinstance(group_id, int):
            # if group_id is int, then we assume that is Group.id
            user = self.model(username=username, email=email, group=Group.objects.get(id=group_id), **extra_fields)
        elif isinstance(group_id, str):
            # if group_id is str, then we assume that is Group.token
            user = self.model(username=username, email=email, group=Group.objects.get(token=group_id), **extra_fields)
        else:
            # otherwise we assume that is a Group instance
            user = self.model(username=username, email=email, group=group_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractUser):
    """Custom user class"""
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='users',
                              verbose_name="Link to user's group")

    REQUIRED_FIELDS = ['group', 'password']
    objects = CustomUserManager()
