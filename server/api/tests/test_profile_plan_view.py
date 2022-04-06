from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from records.models import ProfilePlan, Profile
from base.models import Unit
import datetime


class TestProfilePlanAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json']

    def setUp(self):
        self.initial_count = ProfilePlan.objects.count()
        self.data = {
            "profile": 1,
            "unit": 1,
            "start_date": datetime.date(2022,5,30),
            "end_date": datetime.date(2022,11,30),
            "is_required": True,
            "is_repeating": True
        }
        self.response = self.client.post(
            reverse('plans-list'),
            self.data,
            format="json", 
            content_type="application/json"
        )

    def test_api_create_profile_plan(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProfilePlan.objects.count(), self.initial_count+1)
        self.assertEqual(ProfilePlan.objects.last().start_date, datetime.date(2022,5,30))

    def test_api_list_profile_plans(self):
        url = reverse('plans-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ProfilePlan.objects.count(), self.initial_count+1)

    def test_api_create_profile_plan_failure(self):
        data = {
            "profile": 0,
            "unit": 1,
            "start_date": "2022/11/30",
            "end_date": datetime.date(2022,11,30),
            "is_required": False,
            "is_repeating": True
        }
        self.response = self.client.post(
            reverse('plans-list'),
            data,
            format="json",
            content_type="application/json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_get_profile_plan(self):
        plan = ProfilePlan.objects.last()
        response = self.client.get(
            reverse('plans-detail',
            kwargs={'pk':plan.id}), format="json",
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['end_date'], str(plan.end_date))

    def test_api_update_profile_plan(self):
        plan = ProfilePlan.objects.last()
        new_data = {
            "profile": 1,
            "unit": 1,
            "start_date": datetime.date(2022,5,30),
            "end_date": datetime.date(2022,12,25),
            "is_required": True,
            "is_repeating": False
        }
        response = self.client.put(
            reverse('plans-detail',
            kwargs={'pk':plan.id}), data=new_data, format="json", 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ProfilePlan.objects.last().end_date, datetime.date(2022,12,25))
        self.assertEqual(ProfilePlan.objects.last().is_repeating, False)
        self.assertEqual(ProfilePlan.objects.count(), self.initial_count+1)

    def test_api_update_profile_plan_failure(self):
        plan = ProfilePlan.objects.last()
        new_data = {
            "profile": 0,
            "unit": 1,
            "start_date": datetime.date(2022,5,30),
            "end_date": datetime.date(2022,12,25),
            "is_required": True,
            "is_repeating": False
        }
        response = self.client.put(
            reverse('plans-detail',
            kwargs={'pk':plan.id}), data=new_data, format="json", 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_profile_plan(self):
        plan = ProfilePlan.objects.last()
        response = self.client.delete(
            reverse('plans-detail',
            kwargs={'pk':plan.id}), format="json",
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ProfilePlan.objects.count(), self.initial_count)

    def test_api_profile_plan_not_found(self):
        response = self.client.get(
            reverse('plans-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)