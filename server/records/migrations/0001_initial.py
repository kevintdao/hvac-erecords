# Generated by Django 4.0.2 on 2022-05-04 06:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('base', '0002_alter_buildingmanager_users'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('tag', models.CharField(default=None, max_length=255, null=True, unique=True)),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.company')),
            ],
        ),
        migrations.CreateModel(
            name='ProfilePlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(null=True)),
                ('end_date', models.DateField(null=True)),
                ('is_required', models.BooleanField()),
                ('is_repeating', models.BooleanField()),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plans', to='records.profile')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plans', to='base.unit')),
            ],
        ),
        migrations.CreateModel(
            name='ServiceVisit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField(null=True)),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='records.profileplan')),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='visits', to='base.technician')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='visits', to='base.unit')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('rule', models.JSONField()),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.company')),
            ],
        ),
        migrations.CreateModel(
            name='TaskCompletion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed_at', models.DateTimeField()),
                ('selection', models.IntegerField(blank=True, null=True)),
                ('response', models.TextField(blank=True)),
                ('value', models.FloatField(blank=True, null=True)),
                ('service_visit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='completions', to='records.servicevisit')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='records.task')),
            ],
        ),
        migrations.CreateModel(
            name='ProfileTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.PositiveIntegerField()),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='records.profile')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='records.task')),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='tasks',
            field=models.ManyToManyField(through='records.ProfileTask', to='records.Task'),
        ),
    ]
