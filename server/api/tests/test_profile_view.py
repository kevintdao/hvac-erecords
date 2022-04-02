from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from records.models import Profile

class TestProfileAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json']
    
    def setUp(self):
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
            format="json", 
            content_type="application/json"
        )

    def test_api_create_profile(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Profile.objects.count(), 2)
        self.assertEqual(Profile.objects.last().title, 'Routine AC Maintenance')
        # Ensure that the profile has 2 tasks
        self.assertEqual(len(Profile.objects.last().tasks.all()), 2)

    def test_api_list_profiles(self):
        url = reverse('profiles-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Profile.objects.count(), 2)

    def test_api_create_profile_failure(self):
        data = {
            "title": "Routine AC Maintenance",
            "description": "this is the profile for routine air conditioner maintenance"
        }
        self.response = self.client.post(
            reverse('tasks-list'),
            data,
            format="json",
            content_type="application/json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_get_profile(self):
        profile = Profile.objects.last()
        response = self.client.get(
            reverse('profiles-detail',
            kwargs={'pk':profile.id}), format="json",
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], profile.title)