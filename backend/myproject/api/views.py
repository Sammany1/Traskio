from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import UserSerializer
from base.models import Users

@api_view(['GET'])
def getData(request):
    person = {'name': 'dennis', 'age': 22}
    return Response(person)

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer