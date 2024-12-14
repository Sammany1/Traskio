from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.contrib.auth.hashers import check_password, make_password
from base.models import Users, Projects, Tasks, TaskEvents, ProjectCollaborators, Comments, ActivityLogs
from .serializers import (
    UserSerializer, ProjectSerializer, TaskSerializer, 
    TaskEventSerializer, ProjectCollaboratorSerializer,
    CommentSerializer, ActivityLogSerializer
)
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework import status

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
    permission_classes = [IsAuthenticated]

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

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Hash the password before saving
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        identifier = request.data.get('identifier')
        password = request.data.get('password')
        
        # Try to find user by username
        try:
            user = Users.objects.get(username=identifier)
            if not check_password(password, user.password):
                raise Users.DoesNotExist
        except Users.DoesNotExist:
            # If not found, try email
            try:
                user = Users.objects.get(email=identifier)
                if not check_password(password, user.password):
                    raise Users.DoesNotExist
            except Users.DoesNotExist:
                return Response(
                    {'error': 'Invalid Credentials'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
        
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)