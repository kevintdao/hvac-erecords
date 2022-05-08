from django.test import TestCase

from base.models import Unit
from records.models import ProfilePlan, Profile

import datetime


class ProfilePlanModelTests(TestCase):
    fixtures = ["test_data.json", "test_data_records.json"]

    def test_created_valid_profile_plan(self):
        ProfilePlan.objects.create(
            profile=Profile.objects.first(),
            unit=Unit.objects.first(),
            start_date=datetime.date(2022, 9, 1),
            end_date=datetime.date(2022, 12, 1),
            is_required=True,
            is_repeating=True,
        )
        self.assert_(
            ProfilePlan.objects.filter(
                profile=Profile.objects.first(), end_date=datetime.date(2022, 12, 1)
            ).exists()
        )
