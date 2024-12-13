from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

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
]