from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED

from .models import Chatroom, Post, Comment
from .serializers import PopulatedChatroomSerializer, PostSerializer, ChatroomSerializer, CommentSerializer, PopulatedPostSerializer


class AllChatroomsView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        chatrooms = Chatroom.objects.all()
        serialized_chatrooms = ChatroomSerializer(chatrooms, many=True)
        return Response(serialized_chatrooms.data)


class ChatroomView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, postcode):
        chatroom = Chatroom.objects.get(postcode=postcode)
        serialized_chatroom = PopulatedChatroomSerializer(chatroom)
        return Response(serialized_chatroom.data)


class PostListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        posts = Post.objects.all()
        serialized_posts = PostSerializer(posts, many=True)
        return Response(serialized_posts.data)

    def post(self, request):
        request.data['user'] = request.user.id
        post = PostSerializer(data=request.data)
        if post.is_valid():
            post.save()
            return Response(post.data, status=HTTP_201_CREATED)
        return Response(post.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class PostDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, pk):
        post = Post.objects.get(pk=pk)
        serialized_post = PopulatedPostSerializer(post)
        return Response(serialized_post.data)
    
    def put(self, request, pk):
        request.data['user'] = request.user.id
        post = Post.objects.get(pk=pk)
        if post.user.id == request.user.id:
          updated_post = PostSerializer(post, data=request.data)
          if updated_post.is_valid():
            updated_post.save()
            return Response(updated_post.data)
          return Response(updated_post.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)        
        return Response(status=HTTP_401_UNAUTHORIZED)


    def delete(self, request, pk):
        post = Post.objects.get(pk=pk)
        if post.user.id == request.user.id:
          post.delete()
          return Response(status=HTTP_204_NO_CONTENT)
        return Response(status=HTTP_401_UNAUTHORIZED)


class CommentListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        comments = Comment.objects.all()
        serialized_comments = CommentSerializer(comments, many=True)
        return Response(serialized_comments.data)

    def post(self, request):
        request.data['user'] = request.user.id
        comment = CommentSerializer(data=request.data)
        if comment.is_valid():
            comment.save()
            return Response(comment.data, status=HTTP_201_CREATED)
        return Response(comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    def get(self, _request, pk, post_pk):
        comment = Comment.objects.get(pk=pk)
        serialized_comment = CommentSerializer(comment)
        return Response(serialized_comment.data)

    def put(self, request, pk, post_pk):
        request.data['user'] = request.user.id
        request.data['post'] = post_pk
        comment = Comment.objects.get(pk=pk)
        if comment.user.id == comment.user.id:
          updated_comment = CommentSerializer(comment, data=request.data)
          if updated_comment.is_valid():
            updated_comment.save()
            return Response(updated_comment.data)
          return Response(updated_comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)        
        return Response(status=HTTP_401_UNAUTHORIZED)


    def delete(self, request, pk, post_pk):
        comment = Comment.objects.get(pk=pk)
        if comment.user.id == request.user.id:
          comment.delete()
          return Response(status=HTTP_204_NO_CONTENT)
        return Response(status=HTTP_401_UNAUTHORIZED)
