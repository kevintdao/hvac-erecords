from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from records.models import Task
import datetime

class TestTaskAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json']
    
