from django.urls import path
from users import views as api_view
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/",api_view.RegisterUserAPIView.as_view()),
    path("login/",api_view.LoginUserAPIVIew.as_view()),
    path("token/refresh/",TokenRefreshView.as_view()),
    path("",api_view.GetUserAPIView.as_view()),
    path("logout/",api_view.LogoutAPIView.as_view())
]