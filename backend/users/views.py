from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from users import serializers as api_serializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny

# Create your views here.


class RegisterUserAPIView(GenericAPIView):
    serializer_class = api_serializer.CreateUserSerializer
    
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class LoginUserAPIVIew(GenericAPIView):
    serializer_class = api_serializer.LoginUserSerializer
    
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetUserAPIView(GenericAPIView):
    serializer_class = api_serializer.UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        user = request.user
        serializer = self.serializer_class(user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
class LogoutAPIView(GenericAPIView):
      serializer_class = api_serializer.LogOutSerializer
      permission_classes = [IsAuthenticated]
      
      def post(self,request):
          serializer = self.serializer_class(data=request.data)
          serializer.is_valid(raise_exception=True)
          serializer.save()
          
          return Response({"message":"User logged out!"})