from rest_framework import serializers
from .models import Tasks,TaskStatus
from users.models import User



class UserSerializer(serializers.ModelSerializer): 
      class Meta:
          model = User
          fields = [
              "id",
              "email",
              "full_name"
          ]

class TaskSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(choices=TaskStatus.choices,read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    id = serializers.CharField(read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Tasks
        fields = [
            "id",
            "title",
            "description",
            "user",
            'status',
            'created_at'
        ]
        

class UpdateTaskSerializer(serializers.ModelSerializer):
      title = serializers.CharField(max_length=300)
      description = serializers.CharField()
      status = serializers.ChoiceField(choices=TaskStatus.choices)
      created_at = serializers.DateTimeField(read_only=True)
      user  = UserSerializer(read_only=True)
      
      class Meta:
          model = Tasks
          fields = [
            "title",
            "description",
            "user",
            "status",
            "created_at"
          ]
        

