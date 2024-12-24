from rest_framework import serializers
from base.models import Users, Projects, Tasks, TaskEvents, ProjectCollaborators, Comments, ActivityLogs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, required=False, source='tasks_set')

    class Meta:
        model = Projects
        fields = '__all__'

class TaskEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskEvents
        fields = '__all__'

class ProjectCollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCollaborators
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'

class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLogs
        fields = '__all__'