import django_filters
from .models import TaskStatus


class TaskFilter(django_filters.FilterSet):
       status = django_filters.ChoiceFilter(field_name="status",choices=TaskStatus.choices,label="status")


