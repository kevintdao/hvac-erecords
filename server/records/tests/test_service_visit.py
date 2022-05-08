from datetime import datetime
from django.test import TestCase

from records.models import ServiceVisit, ProfilePlan
from base.models import Technician, Unit

from django.utils import timezone
import datetime


class ServiceVisitModelTests(TestCase):
    fixtures = ["test_data.json", "test_data_records.json"]

    def test_created_valid_service_visit(self):
        technician = Technician.objects.first()
        unit = Unit.objects.first()
        plan = ProfilePlan.objects.first()
        service_visit = ServiceVisit(
            technician=technician,
            unit=unit,
            start_time=timezone.now() - datetime.timedelta(minutes=15),
            plan=plan,
        )
        service_visit.save()
        self.assert_(ServiceVisit.objects.filter(technician=technician).exists())
        end_time = timezone.now()
        service_visit.end_time = end_time
        service_visit.save()
        self.assert_(
            ServiceVisit.objects.filter(
                technician=technician, end_time=end_time
            ).exists()
        )
