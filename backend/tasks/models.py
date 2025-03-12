from django.db import models
from users.models import User
import uuid
# Create your models here.

class TaskStatus(models.TextChoices):
          Pending = "Pending"
          Completed = "Completed"

class Tasks(models.Model):
      
      id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
      title = models.CharField(max_length=300)
      description = models.TextField()
      status = models.CharField(max_length=50,choices=TaskStatus.choices,default=TaskStatus.Pending)
      user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="tasks")
      created_at = models.DateTimeField(auto_now_add=True)
      
      
      def __str__(self):
           return f"{self.title}"
    