from rest_framework import viewsets

from users.models import User
from .serializers import UserSerialiser


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
