from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED

from .models import Chatroom, Post, Comment
from .serializers import PopulatedChatroomSerializer, PostSerializer, ChatroomSerializer


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

    def get(self, _request, pk):
        post = Post.objects.get(pk=pk)
        serialized_post = PostSerializer(post)
        return Response(serialized_post.data)



# class CommentView(APIView):
#     def get(self, request):
#         comment = Comment.objects.all()
#         serializer = CommentSerializer(comment, many=True)
#         return Response(serializer.data)
#     def post(self, request):
#         request.data['user'] = request.user.id
#         comment = CommentSerializer(data=request.data)
#         if comment.is_valid():
#             comment.save()
#             return Response(comment.data, status=HTTP_201_CREATED)
#         return Response(comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)