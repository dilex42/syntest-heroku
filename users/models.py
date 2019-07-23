from django.db import models
from groups.models import Group
from datetime import datetime


class User(models.Model):

    username = models.CharField(max_length=42)
    created = models.DateTimeField(default=datetime.now)
    group = models.ForeignKey(Group, on_delete=models.PROTECT)
