from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import SignupView, LoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'tasks', views.TaskViewSet)
router.register(r'task-events', views.TaskEventViewSet)
router.register(r'project-collaborators', views.ProjectCollaboratorViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'activity-logs', views.ActivityLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/projects/', views.UserProjectsView.as_view(), name='user-projects'),
]