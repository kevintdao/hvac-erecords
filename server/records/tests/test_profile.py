from django.db import DataError
from django.test import TestCase

from records.models import Profile, Task
from base.models import Company


class ProfileModelTests(TestCase):
    fixtures = [
        "test_data.json",
        "test_data_filtering.json",
        "test_data_records.json",
        "test_data_records_filtering.json",
    ]

    def test_created_valid_profile(self):
        Profile.objects.create(
            company=Company.objects.first(),
            title="Spring AC Checklist",
            description="A set of tasks to perform on an air conditioner during spring.",
        )
        self.assert_(
            Profile.objects.filter(
                title="Spring AC Checklist",
                description="A set of tasks to perform on an air conditioner during spring.",
            ).exists()
        )

    def test_created_valid_profile_with_tasks(self):
        profile = Profile(
            company=Company.objects.first(),
            title="Winter AC Checklist",
            description="A set of tasks to perform on an air conditioner before winter.",
        )
        profile.save()
        task1 = Task.objects.first()
        task2 = Task.objects.last()
        profile.tasks.add(task1, through_defaults={"position": 1})
        profile.tasks.add(task2, through_defaults={"position": 2})
        self.assert_(
            Profile.objects.filter(
                title="Winter AC Checklist",
                description="A set of tasks to perform on an air conditioner before winter.",
            ).exists()
        )
        self.assertEqual(len(profile.tasks.all()), 2)
        self.assertEqual(profile.tasks.get(pk=task1.pk), task1)
        self.assertEqual(profile.tasks.get(pk=task2.pk), task2)

    def test_query_profiles_for_reports(self):
        profile = Profile.objects.for_reports().first()
        self.assertNotEqual(profile.tag, "")
        self.assertEqual(profile.company, None)
