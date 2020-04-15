from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Chatroom, Post, Comment
User = get_user_model()

class UserSerializer(serializers.ModelSerializer): 
    class Meta:
        model = User
        fields = ('id', 'username')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'user', 'chatroom', 'text', 'time_stamp', 'is_swapped')
        extra_kwargs = {'is_swapped': {'required': False}}

class ChatroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatroom
        fields = ('id', 'postcode', 'users', 'posts')
        extra_kwargs = {'posts': {'required': False}}

class PopulatedChatroomSerializer(ChatroomSerializer):
    
    users = UserSerializer(many=True)
    posts = PostSerializer(many=True)

