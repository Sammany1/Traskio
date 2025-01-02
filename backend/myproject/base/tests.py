import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from base.models import Users, Projects, Tasks
from django.contrib.auth.hashers import make_password

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user_data():
    return {
        'username': 'testuser',
        'password': 'testpassword',
        'email': 'testuser@example.com'
    }

@pytest.fixture
def create_user(user_data):
    user = Users.objects.create(
        username=user_data['username'],
        email=user_data['email'],
        password=make_password(user_data['password'])
    )
    return user

@pytest.mark.api
@pytest.mark.django_db
def test_user_creation(api_client, user_data):
    response = api_client.post(reverse('signup'), user_data, format='json')
    assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.api
@pytest.mark.django_db
def test_user_login(api_client, create_user, user_data):
    response = api_client.post(reverse('login'), {
        'identifier': user_data['username'],
        'password': user_data['password']
    }, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'access' in response.data
    assert 'refresh' in response.data

@pytest.mark.django_db
def test_project_creation():
    user = Users.objects.create(
        username='testuser',
        email='testuser@example.com',
        password=make_password('testpassword')
    )
    project = Projects.objects.create(name='Test Project', owner=user)
    assert project.name == 'Test Project'
    assert project.owner == user

@pytest.mark.django_db
def test_task_creation():
    user = Users.objects.create(
        username='testuser',
        email='testuser@example.com',
        password=make_password('testpassword')
    )
    project = Projects.objects.create(name='Test Project', owner=user)
    task = Tasks.objects.create(title='Test Task', project=project)
    assert task.title == 'Test Task'
    assert task.project == project
