# Generated by Django 2.2.3 on 2019-07-21 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=42)),
                ('description', models.TextField(max_length=120)),
            ],
        ),
    ]