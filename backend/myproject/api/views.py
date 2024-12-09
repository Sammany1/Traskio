from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import UserSerializer
from base.models import Users

@api_view(['GET'])
def getData(request):
    person = {'name': 'dennis', 'age': 22}
    return Response(person)

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['username', 'email']
    search_fields = ['username', 'email']
    
    def get_queryset(self):
        queryset = Users.objects.all()
        username = self.request.query_params.get('username', None)
        email = self.request.query_params.get('email', None)
        
        if username is not None:
            queryset = queryset.filter(username__exact=username)
        if email is not None:
            queryset = queryset.filter(email__exact=email)
            
        return queryset