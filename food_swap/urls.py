from django.urls import path
from .views import ChatroomView, AllChatroomsView, PostDetailView, PostListView

urlpatterns = [
    path('chatrooms', AllChatroomsView.as_view()),
    path('chatrooms/<str:postcode>/', ChatroomView.as_view()),
    path('posts', PostListView.as_view())
]
