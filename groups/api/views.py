from rest_framework import viewsets

from groups.models import Group
from .serializers import GroupSerialiser


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerialiser
