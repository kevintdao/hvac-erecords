from django.db import DataError
from django.test import TestCase

from records.models import ServiceVisit
from base.models import Technician

from django.utils import timezone

class ServiceVisitModelTests(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json'] 
    
    def test_created_valid_service_visit(self):
        technician = Technician.objects.first()
        service_visit = ServiceVisit(technician=technician)
        service_visit.save()
        self.assert_(ServiceVisit.objects.filter(technician=technician).exists())
        end_time = timezone.now()
        service_visit.end_time = end_time
        service_visit.save()
        self.assert_(ServiceVisit.objects.filter(technician=technician,end_time=end_time).exists())