from rest_framework import serializers

from groups.models import Group


class GroupSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('ID', 'name', 'description', 'delete_disabled')
