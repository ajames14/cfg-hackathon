from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Chatroom, Post, Comment
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'image')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'user', 'post', 'text', 'time_stamp')

class PopulatedCommentSerializer(CommentSerializer):

    user = UserSerializer()

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'user', 'chatroom', 'text',
                  'time_stamp', 'is_swapped', 'comments')
        extra_kwargs = {'is_swapped': {'required': False},
                        'comments': {'required': False}}


class PopulatedPostSerializer(PostSerializer):

    user = UserSerializer()
    comments = PopulatedCommentSerializer(many=True)


class ChatroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatroom
        fields = ('id', 'postcode', 'users', 'posts')
        extra_kwargs = {'posts': {'required': False}}


class PopulatedChatroomSerializer(ChatroomSerializer):

    users = UserSerializer(many=True)
    posts = PopulatedPostSerializer(many=True)
