# Generated by Django 4.0.2 on 2022-04-06 03:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0005_rename_id_technician_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='buildingmanager',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
