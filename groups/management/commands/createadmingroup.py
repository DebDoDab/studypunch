from django.core.management.base import BaseCommand, CommandError
from groups.models import Group


class Command(BaseCommand):
    help = 'create admin group for first superuser'

    def handle(self, *args, **options):
        group_id = Group.createAdminGroup()
        self.stdout.write(f'Successfully created admin group. Use {group_id=} to create your first superuser')
