from food_swap.serializers import ChatroomSerializer
from food_swap.models import Chatroom
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED, HTTP_202_ACCEPTED, HTTP_200_OK


from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer, ValidateSerializer
User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        serializer = ValidateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'}, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(
                {'message': 'Invalid credentials'}, status=HTTP_401_UNAUTHORIZED)

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied(
                {'message': 'Invalid credentials'}, status=HTTP_401_UNAUTHORIZED)

        token = jwt.encode(
            {'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})


class ProfileView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=HTTP_200_OK)

    def put(self, request):
        initial_user = User.objects.get(pk=request.user.id)
        if 'postcode' in request.data.keys():
            request.data['postcode'] = request.data['postcode'].upper()

        updated_user = UserSerializer(initial_user, data=request.data)

        if updated_user.is_valid():
            updated_user.save()

            if 'postcode' in request.data.keys():
                try:
                  # remove user from other chatroom:
                    chatrooms_all = Chatroom.objects.all()
                    serializer_all = ChatroomSerializer(
                        chatrooms_all, many=True)

                    for ordered_dict in serializer_all.data:
                        for user_tuple in list(ordered_dict.items())[2][1]:
                            if user_tuple == updated_user.data['id']:
                                list(ordered_dict.items())[
                                    2][1].remove(user_tuple)
                                chatroom_obj = Chatroom.objects.get(
                                    pk=list(ordered_dict.items())[0][1])
                                new_chatroom_data = {'postcode': list(ordered_dict.items())[
                                    1][1], 'users': list(ordered_dict.items())[2][1]}
                                new_chatroom = ChatroomSerializer(
                                    chatroom_obj, data=new_chatroom_data)
                                if new_chatroom.is_valid():
                                    new_chatroom.save()
                                else:
                                    print('error', new_chatroom.data)

                  # add to new chatroom:
                    chatroom_data = Chatroom.objects.get(
                        postcode=request.data['postcode'])
                    serialized_chatroom = ChatroomSerializer(chatroom_data)
                    serialized_chatroom.data['users'].append(
                        updated_user.data['id'])
                    obj = Chatroom.objects.get(
                        pk=serialized_chatroom.data['id'])

                    chatroom_data = {
                        'postcode': serialized_chatroom.data['postcode'], 'users': serialized_chatroom.data['users']}
                    chatroom = ChatroomSerializer(obj, data=chatroom_data)
                    if chatroom.is_valid():
                        chatroom.save()
                    else:
                        print('error', chatroom.data)

                except Chatroom.DoesNotExist:
                    chatroom_data = {'postcode': request.data['postcode'], 'users': [
                        updated_user.data['id']]}
                    chatroom = ChatroomSerializer(data=chatroom_data)
                    if chatroom.is_valid():
                        chatroom.save()

            return Response({'id': updated_user.data['id'], 'username': updated_user.data['username'], 'postcode': updated_user.data['postcode'] }, status=HTTP_202_ACCEPTED)

        return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request):
        user = User.objects.get(pk=request.user.id)
        user.delete()
        return Response(status=HTTP_200_OK)
