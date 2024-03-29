"""
ASGI config for studypunch project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.http import AsgiHandler
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

from django.core.asgi import get_asgi_application

import studypunch.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'studypunch.settings.dev')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        studypunch.routing.websocket_urlpatterns
    ),
    ## IMPORTANT::Just HTTP for now. (We can add other protocols later.)
})