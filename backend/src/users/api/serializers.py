from rest_framework import serializers

from users.models import User


class GroupNameField(serializers.RelatedField):
    def to_representation(self, value):
        return '%s' % (value.name)


class UserSerialiser(serializers.ModelSerializer):
    group_name = GroupNameField(
        source='group', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'created', 'group', 'group_name')
