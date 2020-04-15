from django.urls import path
from .views import ChatroomView, AllChatroomsView, PostDetailView, PostListView, CommentListView, CommentDetailView

urlpatterns = [
    path('chatrooms', AllChatroomsView.as_view()),
    path('chatrooms/<str:postcode>/', ChatroomView.as_view()),
    path('posts', PostListView.as_view()),
    path('posts/<int:pk>/', PostDetailView.as_view()),
    path('comments', CommentListView.as_view()),
    path('posts/<int:post_pk>/comments/<int:pk>/', CommentDetailView.as_view())
]
