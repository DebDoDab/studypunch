import json

from channels.exceptions import DenyConnection
from channels.generic.websocket import AsyncWebsocketConsumer

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import AnonymousUser


class LiveHomeworkConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['group_id']
        self.room_group_name = 'room_%s' % self.room_name
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data):
        response = json.loads(text_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_message',
                'homework': response['homework'],
                'method': response['method'],
            },
        )

    async def send_message(self, event):
        await self.send(text_data=json.dumps({
            'homework': event['homework'],
            'method': event['method'],
        }))

    async def websocket_disconnect(self, message):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await self.close()