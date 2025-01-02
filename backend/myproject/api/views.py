from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.contrib.auth.hashers import check_password, make_password
from django.db.models import Q
from base.models import Users, Projects, Tasks, TaskEvents, ProjectCollaborators, Comments, ActivityLogs
from .serializers import (
    UserSerializer, ProjectSerializer, TaskSerializer, 
    TaskEventSerializer, ProjectCollaboratorSerializer,
    CommentSerializer, ActivityLogSerializer
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import status
from base.authentication import get_tokens_for_user, CustomJWTAuthentication

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
        data = request.data.copy()
        data['updated_at'] = timezone.now()
        data.pop('owner', None)  # Remove the owner field if present
        data.pop('id', None)
        data.pop('isEditing', None)
        data.pop('tasks', None)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class TaskViewSet(BaseModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    filterset_fields = ['title']
    search_fields = ['title']
    # permission_classes = [IsAuthenticated]

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
        
        try:
            # Try to find user by username or email
            user = Users.objects.filter(
                Q(username=identifier) | 
                Q(email=identifier)
            ).first()
            
            if not user:
                raise Users.DoesNotExist
                
            if not check_password(password, user.password):
                raise Users.DoesNotExist
                
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Login successful',
                **tokens
            }, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
class UserProjectsView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if (pk):
            try:
                project = Projects.objects.get(pk=pk, owner=request.user)
                serializer = ProjectSerializer(project)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Projects.DoesNotExist:
                return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            projects = Projects.objects.filter(owner=request.user).prefetch_related('tasks_set')
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data['owner'] = request.user.id  # Set the owner to the authenticated user
        serializer = ProjectSerializer(data=data)
        data.pop('id', None)
        data.pop('isEditing', None)
        data.pop('tasks', None)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
    def put(self, request):
        user = request.user
        data = request.data.copy()
        data.pop('password', None)  # Prevent password update through this endpoint
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        old_password = request.data.get('oldPassword')
        new_password = request.data.get('newPassword')

        if not check_password(old_password, user.password):
            return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        user.password = make_password(new_password)
        user.save()
        return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)