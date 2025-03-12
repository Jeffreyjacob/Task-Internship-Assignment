from django.shortcuts import render
from tasks import serializers as api_serializer
from rest_framework.generics import GenericAPIView,ListAPIView,DestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Tasks
from django_filters.rest_framework import DjangoFilterBackend
from .filters import TaskFilter

# Create your views here.


class CreateTaskAPIView(GenericAPIView):
    serializer_class = api_serializer.TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        user = request.user
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class GetAllTaskAPIView(ListAPIView):
      serializer_class = api_serializer.TaskSerializer
      permission_classes = [AllowAny]
      queryset = Tasks.objects.select_related("user").all()
      filter_backends = (DjangoFilterBackend,)
      filterset_class = TaskFilter

class GetTaskbyIdAPIView(GenericAPIView):
      serializer_class = api_serializer.TaskSerializer
      permission_classes = [AllowAny]
      
      def get(self,request,id):
          
          try:
             task = Tasks.objects.get(id=id)
             serializer = self.serializer_class(task)
             return Response(serializer.data,status=status.HTTP_200_OK) 
          except Tasks.DoesNotExist:
              return Response({"message":"Task does not exist"},status=status.HTTP_404_NOT_FOUND)


class UpdateTaskAPIView(GenericAPIView):
      serializer_class = api_serializer.UpdateTaskSerializer
      permission_classes = [IsAuthenticated]

      def put(self,request,id):
          
          try:
              task = Tasks.objects.get(id=id) 
          except Tasks.DoesNotExist:
              return Response({"message":"task with id not found"},status=status.HTTP_404_NOT_FOUND)
          
          serializer = self.serializer_class(task,data=request.data,partial=True)
          if serializer.is_valid(raise_exception=True):
              serializer.save()
              return Response(serializer.data,status=status.HTTP_200_OK)
          return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
      

class DeleteTaskAPIView(DestroyAPIView):
      serializer_class = api_serializer.TaskSerializer
      permission_classes = [IsAuthenticated]
      queryset = Tasks.objects.all()
      lookup_field = "id"
      
      
          

            
    