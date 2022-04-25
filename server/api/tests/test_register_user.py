from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class TestRegisterUser(APITestCase):
    def setUp(self):
        self.data = {
            'email': 'test44@test.com',
            # 'username': 'test44@test.com',
            'password': 'Testing44*'
        }
    
    def test_register_user(self):
        response = self.client.post(reverse('register'), self.data, format = 'json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_access_token(self):
        response = self.client.post(reverse('register'), self.data, format = 'json')

        response = self.client.post(reverse('token_obtain_pair'), self.data, format='json')

        self.assertTrue('access' in response.json())

    def test_refresh_token(self):
        response = self.client.post(reverse('register'), self.data, format = 'json')

        response = self.client.post(reverse('token_obtain_pair'), self.data, format='json')

        data = {'refresh': response.json()['refresh']}
        response = self.client.post(reverse('token_refresh'), data, format='json')
        self.assertTrue('access' in response.json())

    def test_login_user(self):
        response = self.client.post(reverse('register'), self.data, format = 'json')

        response = self.client.post(reverse('token_obtain_pair'), self.data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + response.json()['access'])

        response = self.client.get(reverse('login'), {})
        self.assertEqual(response.status_code, status.HTTP_200_OK)