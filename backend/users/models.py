from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.

class UserManager(BaseUserManager):
      
      def create(self,full_name,email,password=None):
          email = self.normalize_email(email)
          email = email.lower()
          user = self.model(
              full_name = full_name,
              email = email
          )
          user.set_password(password)
          user.save(using=self._db)
          return user
      
      def create_superuser(self,full_name,email,password=None):
          user = self.create(
              full_name= full_name,
              email = email,
              password = password
          )
          user.is_superuser = True
          user.is_staff = True
          user.is_verified = True
          user.save(using=self._db)
          return user


class User(AbstractBaseUser,PermissionsMixin):
    
      full_name = models.CharField(max_length=300)
      email = models.EmailField(unique=True,max_length=100)
      is_active = models.BooleanField(default=True)
      is_staff = models.BooleanField(default=False)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
      
      USERNAME_FIELD = 'email'
      REQUIRED_FIELDS = ['full_name']
      
      
      objects = UserManager()
      
      def __str__(self):
           return f"{self.email}"
      
      @property
      def get_full_name(self):
          return f"{self.full_name}"
      
      
      def token(self):
          refresh = RefreshToken.for_user(self)
          return {
              "refresh":str(refresh),
              "access": str(refresh.access_token)
          }
          
