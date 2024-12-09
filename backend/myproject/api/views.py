from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from base.models import Users, Projects, Tasks, TaskEvents, ProjectCollaborators, Comments, ActivityLogs
from .serializers import (
    UserSerializer, ProjectSerializer, TaskSerializer, 
    TaskEventSerializer, ProjectCollaboratorSerializer,
    CommentSerializer, ActivityLogSerializer
)

@api_view(['GET'])
def getData(request):
    person = {'name': 'dennis', 'age': 22}
    return Response(person)

class BaseModelViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    def get_queryset(self):
        queryset = self.queryset
        for field, value in self.request.query_params.items():
            if field in self.filterset_fields:
                queryset = queryset.filter(**{f"{field}__exact": value})
        return queryset

class UserViewSet(BaseModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    filterset_fields = ['username', 'email']
    search_fields = ['username', 'email']

class ProjectViewSet(BaseModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    filterset_fields = ['name', 'owner']
    search_fields = ['^name', 'owner__username']  # '^' means "starts with"
    
    def get_queryset(self):
        queryset = Projects.objects.all()
        name = self.request.query_params.get('name', None)
        
        if name is not None:
            # Use icontains for case-insensitive partial matching
            queryset = queryset.filter(name__icontains=name)
            
        return queryset

    def update(self, request, *args, **kwargs):
        request.data['updated_at'] = timezone.now()
        return super().update(request, *args, **kwargs)

class TaskViewSet(BaseModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    filterset_fields = ['title', 'status', 'priority', 'assigned_to']
    search_fields = ['title', 'assigned_to__username']

class TaskEventViewSet(BaseModelViewSet):
    queryset = TaskEvents.objects.all()
    serializer_class = TaskEventSerializer
    filterset_fields = ['title', 'task']
    search_fields = ['title']

class ProjectCollaboratorViewSet(BaseModelViewSet):
    queryset = ProjectCollaborators.objects.all()
    serializer_class = ProjectCollaboratorSerializer
    filterset_fields = ['project', 'user', 'role']
    search_fields = ['user__username', 'project__name']

class CommentViewSet(BaseModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer
    filterset_fields = ['task', 'user']
    search_fields = ['content', 'user__username']

class ActivityLogViewSet(BaseModelViewSet):
    queryset = ActivityLogs.objects.all()
    serializer_class = ActivityLogSerializer
    filterset_fields = ['user', 'action']
    search_fields = ['action', 'user__username']