from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from records.models import Profile
from base.models import User, Company
from rest_framework.test import APIClient

class TestProfileAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json']
    
    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            company = Company.objects.first()
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.initial_count = Profile.objects.count()
        self.data = {
            "title": "Routine AC Maintenance",
            "description": "this is the profile for routine air conditioner maintenance",
            "tasks": [
                {
                    "task_id": 1,
                    "position": 1
                },
                {
                    "task_id": 2,
                    "position": 2
                }
            ]
        }

        self.response = self.client.post(
            reverse('profiles-list'),
            self.data,
            format="json"
        )

    def test_api_create_profile(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Profile.objects.count(), self.initial_count+1)
        self.assertEqual(Profile.objects.last().title, 'Routine AC Maintenance')
        # Ensure that the profile has 2 tasks
        self.assertEqual(len(Profile.objects.last().tasks.all()), 2)

    def test_api_list_profiles(self):
        url = reverse('profiles-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Profile.objects.count(), self.initial_count+1)

    def test_api_create_profile_failure(self):
        data = {
            "title": "Routine AC Maintenance",
            "description": "this is the profile for routine air conditioner maintenance"
        }
        self.response = self.client.post(
            reverse('profiles-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_get_profile(self):
        profile = Profile.objects.last()
        response = self.client.get(
            reverse('profiles-detail',
            kwargs={'pk':profile.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], profile.title)

    def test_api_update_profile(self):
        profile = Profile.objects.last()
        new_data = {
            "title": "Routine maintenance for packed units",
            "description": "this is the profile for routine for packed units",
            "tasks": [
                {
                    "task_id": 1,
                    "position": 1
                },
                {
                    "task_id": 1,
                    "position": 2
                },
                {
                    "task_id": 2,
                    "position": 3
                }
            ]
        }
        response = self.client.put(
            reverse('profiles-detail',
            kwargs={'pk':profile.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Profile.objects.last().description, 'this is the profile for routine for packed units')
        self.assertEqual(len(Profile.objects.last().tasks.all()), 3)


    def test_api_update_profile_failure(self):
        profile = Profile.objects.last()
        new_data = {
            "title": "Routine maintenance for packed units",
            "tasks": [
                {
                    "task_id": 1,
                    "position": 2
                },
                {
                    "task_id": 2,
                    "position": 3
                }
            ]
        }
        response = self.client.put(
            reverse('profiles-detail',
            kwargs={'pk':profile.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_profile(self):
        profile = Profile.objects.last()
        response = self.client.delete(
            reverse('profiles-detail',
            kwargs={'pk':profile.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Profile.objects.count(), self.initial_count)

    def test_api_profile_not_found(self):
        response = self.client.get(
            reverse('profiles-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)