from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import SignupView, LoginView, UserProjectsView, UserDetailView, UpdatePasswordView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'tasks', views.TaskViewSet, basename='task')
router.register(r'task-events', views.TaskEventViewSet)
router.register(r'project-collaborators', views.ProjectCollaboratorViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'activity-logs', views.ActivityLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/projects/', UserProjectsView.as_view(), name='user-projects'),
    path('user/projects/<int:pk>/', views.UserProjectsView.as_view(), name='user-project-detail'),
    path('user/me/', UserDetailView.as_view(), name='user-detail'),
    path('user/me/password/', UpdatePasswordView.as_view(), name='update-password'),
]