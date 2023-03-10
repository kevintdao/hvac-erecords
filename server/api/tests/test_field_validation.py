import datetime

from base.models import (
    Company,
    Unit,
    User,
    Building,
    BuildingManager,
    Technician,
)
from records.models import (
    ServiceVisit,
    Task,
    Profile,
    ProfilePlan,
)
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role


class TestFieldValidationAPI(TestCase):
    fixtures = [
        "test_data.json",
        "test_data_records.json",
        "test_data_filtering.json",
        "test_data_records_filtering.json",
    ]

    def setUp(self):
        self.user_company = User.objects.get(pk=1)
        assign_role(self.user_company, "company")

        self.user_manager = User.objects.get(pk=2)
        assign_role(self.user_manager, "manager")

        self.user_technician = User.objects.get(pk=3)
        assign_role(self.user_technician, "technician")

        self.company = Company.objects.get(pk=1)

        self.manager = BuildingManager.objects.filter(users=self.user_manager).first()

        self.client = APIClient()

    def test_api_building_bad_manager(self):
        self.client.force_authenticate(user=self.user_company)
        manager_not_related = BuildingManager.objects.exclude(
            company=self.company
        ).first()

        data = {
            "manager": manager_not_related.id,
            "site_name": "Seamans Center",
            "street": "103 South Capitol Strreet",
            "city": "Iowa City",
            "state": "Iowa",
            "zip_code": "52240",
            "country": "United States",
        }
        response = self.client.post(reverse("buildings-list"), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_building_bad_manager_update(self):
        self.client.force_authenticate(user=self.user_company)
        manager_not_related = BuildingManager.objects.exclude(
            company=self.company
        ).first()

        building = Building.objects.first()
        new_data = {
            "manager": manager_not_related.id,
            "site_name": "Seamans Center",
            "street": "103 South Capitol Strreet",
            "city": "Iowa City",
            "state": "Iowa",
            "zip_code": "52241",
            "country": "United States",
        }
        response = self.client.put(
            reverse("buildings-detail", kwargs={"pk": building.id}),
            data=new_data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_unit_bad_building(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        building_not_related = Building.objects.exclude(manager__in=managers).first()

        data = {
            "building": building_not_related.id,
            "external_id": "",
            "category": "AC",
            "serial_number": "24ABC542W003102",
            "model_number": "1234A00",
            "manufacturer": "Trane",
            "production_date": datetime.date(2015, 10, 20),
            "installation_date": datetime.date(2016, 1, 1),
        }
        response = self.client.post(reverse("units-list"), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_service_visit_bad_fields(self):
        self.client.force_authenticate(user=self.user_technician)
        # TODO: don't use first and last
        unit_related = Unit.objects.first()
        plan_related = ProfilePlan.objects.first()
        technician_not_related = Technician.objects.last()
        unit_not_related = Unit.objects.last()
        plan_not_related = ProfilePlan.objects.last()

        data_technician = {
            "technician": technician_not_related.user_id,
            "unit": unit_related.id,
            "plan": plan_related.id,
            "start_time": "2022-03-20T17:41:28+00:00",
            "end_time": "2022-03-22T17:41:28+00:00",
        }

        data_unit = {
            "technician": self.user_technician.id,
            "unit": unit_not_related.id,
            "plan": plan_related.id,
            "start_time": "2022-03-20T17:41:28+00:00",
            "end_time": "2022-03-22T17:41:28+00:00",
        }

        data_plan = {
            "technician": self.user_technician.id,
            "unit": unit_related.id,
            "plan": plan_not_related.id,
            "start_time": "2022-03-20T17:41:28+00:00",
            "end_time": "2022-03-22T17:41:28+00:00",
        }
        response = self.client.post(
            reverse("visits-list"), data_technician, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(reverse("visits-list"), data_unit, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(reverse("visits-list"), data_plan, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_profile_plan_bad_fields(self):
        self.client.force_authenticate(user=self.user_company)
        # TODO: don't use first and last
        unit_related = Unit.objects.first()
        profile_related = Profile.objects.first()
        unit_not_related = Unit.objects.last()
        profile_not_related = Profile.objects.last()

        data_profile = {
            "profile": profile_not_related.id,
            "unit": unit_related.id,
            "start_date": datetime.date(2022, 5, 30),
            "end_date": datetime.date(2022, 11, 30),
            "is_required": True,
            "is_repeating": True,
        }

        data_unit = {
            "profile": profile_related.id,
            "unit": unit_not_related.id,
            "start_date": datetime.date(2022, 5, 30),
            "end_date": datetime.date(2022, 11, 30),
            "is_required": True,
            "is_repeating": True,
        }

        response = self.client.post(reverse("plans-list"), data_profile, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(reverse("plans-list"), data_unit, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_profile_bad_tasks(self):
        self.client.force_authenticate(user=self.user_company)
        # TODO: don't use first and last
        task_related = Task.objects.first()
        task_not_related = Task.objects.last()

        data_profile = {
            "title": "Routine AC Maintenance",
            "description": "this is the profile for routine air conditioner maintenance",
            "tasks": [
                {"task_id": task_related.id, "position": 1},
                {"task_id": task_not_related.id, "position": 2},
            ],
        }

        response = self.client.post(
            reverse("profiles-list"), data_profile, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_task_completion_bad_fields(self):
        self.client.force_authenticate(user=self.user_technician)
        # TODO: don't use first and last
        task_related = Task.objects.first()
        visit_related = ServiceVisit.objects.first()
        task_not_related = Task.objects.last()
        visit_not_related = ServiceVisit.objects.last()

        data_task = {
            "task": task_not_related.id,
            "service_visit": visit_related.id,
            "completed_at": visit_related.start_time + datetime.timedelta(minutes=1),
            "response": "This is the technician response",
        }

        data_visit = {
            "task": task_related.id,
            "service_visit": visit_not_related.id,
            "completed_at": visit_not_related.start_time
            + datetime.timedelta(minutes=1),
            "response": "This is the technician response",
        }

        response = self.client.post(
            reverse("completions-list"), data_task, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(
            reverse("completions-list"), data_visit, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Company Field Tests

    def test_api_task_bad_company_update(self):
        self.client.force_authenticate(user=self.user_company)
        task = Task.objects.for_user(self.user_company).first()
        company_not_related = Company.objects.exclude(pk=self.company.id).first()

        self.assertEqual(task.company, self.company)
        new_data = {
            "company": company_not_related.id,
            "title": "Unit in good condition",
            "description": "choose if the condition is in a satisfactory condition",
            "rule": '{	"type": "1", "name": "response" }',
        }
        response = self.client.put(
            reverse("tasks-detail", kwargs={"pk": task.id}),
            data=new_data,
            format="json",
        )
        self.assertNotEqual(task.company, company_not_related)
        self.assertEqual(task.company, self.company)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_profile_bad_company_update(self):
        self.client.force_authenticate(user=self.user_company)
        profile = Profile.objects.for_user(self.user_company).first()
        company_not_related = Company.objects.exclude(pk=self.company.id).first()

        self.assertEqual(profile.company, self.company)
        new_data = {
            "company": company_not_related.id,
            "title": "Routine AC Maintenance",
            "description": "this is the profile for routine air conditioner maintenance",
            "tasks": [
                {"task_id": 1, "position": 1},
            ],
        }
        response = self.client.put(
            reverse("profiles-detail", kwargs={"pk": profile.id}),
            data=new_data,
            format="json",
        )
        self.assertNotEqual(profile.company, company_not_related)
        self.assertEqual(profile.company, self.company)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
