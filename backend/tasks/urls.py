from django.urls import path
from tasks import views as api_view


urlpatterns = [
    path("",api_view.GetAllTaskAPIView.as_view()),
    path("create/",api_view.CreateTaskAPIView.as_view()),
    path("<id>",api_view.GetTaskbyIdAPIView.as_view()),
    path("update/<id>/",api_view.UpdateTaskAPIView.as_view()),
    path("delete/<id>/",api_view.DeleteTaskAPIView.as_view())
]