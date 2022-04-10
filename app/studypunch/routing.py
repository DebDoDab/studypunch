from django.conf.urls import url
from studypunch.websocket import LiveHomeworkConsumer

websocket_urlpatterns = [
    url(r'websocket/(?P<group_id>\w+)/', LiveHomeworkConsumer.as_asgi()),
]