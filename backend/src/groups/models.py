from django.db import models


class Group(models.Model):

    ID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=42)
    description = models.TextField(max_length=120)

    def __str__(self):
        return self.name

    def delete_disabled(self):
        if self.user_set.all().exists():
            return True
        return False
