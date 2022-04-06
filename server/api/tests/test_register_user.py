# from django.test import TestCase
# from rest_framework.test import APIRequestFactory

# factory = APIRequestFactory()
# data = {'email': 'test44@test.com','username': 'test44' ,'password': 'Testing44*'}
# # http://localhost:8000/api/api/register
# request = factory.post('/api/api/register', data, format='json')

from email import header
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class RegisterUserTest(APITestCase):
    
    def test_register_user(self):
        url = 'http://localhost:8000/api/register/'
        data = {'email': 'test44@test.com','username': 'test44@test.com' ,'password': 'Testing44*'}
        response = self.client.post(url, data, format = 'json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_access_token(self):

        url = 'http://localhost:8000/api/register/'
        data = {'email': 'test44@test.com', 'username': 'test44@test.com' ,'password': 'Testing44*'}
        response = self.client.post(url, data, format = 'json')

        url = 'http://localhost:8000/api/token/'
        data = {'username': 'test44@test.com', 'password': 'Testing44*' }
        response = self.client.post(url, data, format='json')

        self.assertTrue('access' in response.json())

    def test_refresh_token(self):

        url = 'http://localhost:8000/api/register/'
        data = {'email': 'test44@test.com','username': 'test44@test.com' ,'password': 'Testing44*'}
        response = self.client.post(url, data, format = 'json')

        url = 'http://localhost:8000/api/token/'
        data = {'username': 'test44@test.com', 'password': 'Testing44*' }
        response = self.client.post(url, data, format='json')

        url = 'http://localhost:8000/api/token/refresh/'
        # print(response.json()['refresh'])
        data = {'refresh': response.json()['refresh']}
        response = self.client.post(url, data, format='json')
        self.assertTrue('access' in response.json())

    def test_login_user(self):

        url = 'http://localhost:8000/api/register/'
        data = {'email': 'test44@test.com','username': 'test44@test.com' ,'password': 'Testing44*'}
        response = self.client.post(url, data, format = 'json')

        url = 'http://localhost:8000/api/token/'
        data = {'username': 'test44@test.com', 'password': 'Testing44*' }
        response = self.client.post(url, data, format='json')
        #print(response.json()['refresh'])
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + response.json()['access'])

        url = 'http://localhost:8000/api/user/'
        response = self.client.get(url, {})
        self.assertEqual(response.status_code, status.HTTP_200_OK)