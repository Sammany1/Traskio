# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ActivityLogs(models.Model):
    user = models.ForeignKey('Users', models.DO_NOTHING)
    task = models.ForeignKey('Tasks', models.DO_NOTHING, blank=True, null=True)
    project = models.ForeignKey('Projects', models.DO_NOTHING, blank=True, null=True)
    action = models.CharField(max_length=255)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'activity_logs'


class Comments(models.Model):
    task = models.ForeignKey('Tasks', models.DO_NOTHING)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    content = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments'


class ProjectCollaborators(models.Model):
    project = models.ForeignKey('Projects', models.DO_NOTHING)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    role = models.CharField(max_length=50, blank=True, null=True)
    added_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_collaborators'


class Projects(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey('Users', models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'projects'


class TaskEvents(models.Model):
    task = models.ForeignKey('Tasks', models.DO_NOTHING)
    event_date = models.DateField()
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'task_events'


class Tasks(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    project = models.ForeignKey(Projects, models.DO_NOTHING)
    assigned_to = models.ForeignKey('Users', models.DO_NOTHING, db_column='assigned_to', blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    priority = models.CharField(max_length=50, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    due_date = models.DateField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tasks'


class Users(models.Model):
    username = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    email = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
