from django.db import models

class Users(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    email = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Required for JWT authentication
    @property
    def is_authenticated(self):
        return True
        
    class Meta:
        managed = False
        db_table = 'users'

class Projects(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey('Users', models.CASCADE, db_column='owner_id')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'projects'

class Tasks(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    project = models.ForeignKey(Projects, models.CASCADE, db_column='project_id')
    assigned_to = models.ForeignKey('Users', models.SET_NULL, db_column='assigned_to', blank=True, null=True)
    status = models.CharField(max_length=50, default='To Do')
    priority = models.CharField(max_length=50, default='Medium')
    start_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tasks'

class TaskEvents(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Tasks, models.CASCADE, db_column='task_id')
    event_date = models.DateField()
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'task_events'

class ProjectCollaborators(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Projects, models.CASCADE, db_column='project_id')
    user = models.ForeignKey('Users', models.CASCADE, db_column='user_id')
    role = models.CharField(max_length=50, default='Viewer')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'project_collaborators'

class Comments(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Tasks, models.CASCADE, db_column='task_id')
    user = models.ForeignKey('Users', models.CASCADE, db_column='user_id')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'comments'

class ActivityLogs(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.CASCADE, db_column='user_id')
    task = models.ForeignKey(Tasks, models.CASCADE, db_column='task_id', blank=True, null=True)
    project = models.ForeignKey(Projects, models.CASCADE, db_column='project_id', blank=True, null=True)
    action = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'activity_logs'