from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Chatroom, Post, Comment
User = get_user_model()


class ChatroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatroom
        fields = ('id', 'postcode')

