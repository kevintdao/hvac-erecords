from django.db import DataError
from django.test import TestCase

from records.models import Profile, Task

class ProfileModelTests(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json'] 

    def test_created_valid_profile(self):
        Profile.objects.create(title='Spring AC Checklist',description='A set of tasks to perform on an air conditioner during spring.')
        self.assert_(Profile.objects.filter(title='Spring AC Checklist',description='A set of tasks to perform on an air conditioner during spring.').exists())

    def test_created_valid_profile_with_tasks(self):
        profile = Profile(title='Winter AC Checklist',description='A set of tasks to perform on an air conditioner before winter.')
        profile.save()
        task = Task.objects.first()
        profile.tasks.add(task)
        self.assert_(Profile.objects.filter(title='Winter AC Checklist',description='A set of tasks to perform on an air conditioner before winter.',tasks=1).exists())
        self.assertEqual(profile.tasks.get(pk=task.pk), task)