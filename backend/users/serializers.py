from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken

class CreateUserSerializer(serializers.ModelSerializer):
      password = serializers.CharField(min_length=7,write_only=7)
      class Meta:
          model = User
          fields = [
              "email",
              "password",
              "full_name"
          ]
          
      def validate(self, attrs):
           required_fields = ["full_name","email","password"]
           for fields in required_fields:
               if fields not in attrs:
                   raise serializers.ValidationError({"message":f"{fields} is required"})
               
           if User.objects.filter(email=attrs['email']).exists():
                raise serializers.ValidationError({"message":"email already exist"})
            
           return super().validate(attrs)
          
      def create(self, validated_data):
           email = validated_data.get("email")
           full_name = validated_data.get("full_name")
           password = validated_data.get("password")
           user = User.objects.create(
               email = email,
               full_name = full_name
           )
           user.set_password(password)
           user.save()
           return user
       
class LoginUserSerializer(serializers.ModelSerializer):
      email = serializers.EmailField()
      id = serializers.IntegerField(read_only=True)
      refresh = serializers.CharField(max_length=300,read_only=True)
      access = serializers.CharField(max_length=300,read_only=True)
      password = serializers.CharField(max_length=100,write_only=True)
      full_name = serializers.CharField(read_only=True)
      class Meta:
          model = User
          fields = [
              "id",
              "email",
              "full_name",
              "password",
              "refresh",
              "access"
          ]
      
      def validate(self, attrs):
          email = attrs['email']
          password = attrs['password']
          
          required_fields = ["email","password"]
          for field in required_fields:
              if field not in attrs:
                    raise serializers.ValidationError({"message":f"{field} is required"})
          
          user = authenticate(email=email,password=password)
          if not user:
              raise AuthenticationFailed({"message":"Invalid Credentials, Try again!"})
          
          user_token = user.token()
          return{
              "id":user.id,
              "email":user.email,
              "full_name":user.get_full_name,
              "access":str(user_token.get("access")),
              "refresh":str(user_token.get("refresh")),
          }
           

class UserSerializer(serializers.ModelSerializer):
      class Meta:
          model = User
          fields = [
              "id",
              "email",
              "full_name"
          ]
          
class LogOutSerializer(serializers.Serializer):
      refresh = serializers.CharField()
      
      default_error_messages = {
          'bad_token':{'token is expired or invalid'}
      }
      
      def validate(self, attrs):
           self.token = attrs['refresh']
           return super().validate(attrs)
      
      def save(self,**kwargs):
          try:
              RefreshToken(self.token).blacklist()
          except InvalidToken as e:
              self.fail('bad token')
              
          

        