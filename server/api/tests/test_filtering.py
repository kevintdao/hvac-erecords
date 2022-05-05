import datetime

from base.models import Company, Unit, User, Building, BuildingManager, Technician
from records.models import ServiceVisit, Task, Profile, ProfileTask, ProfilePlan, TaskCompletion
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role, clear_roles


class TestFilteringAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json', 'test_data_filtering.json', 'test_data_records_filtering.json']

    def setUp(self):
        self.user_company = User.objects.get(pk=1)
        assign_role(self.user_company, 'company')

        self.user_manager = User.objects.get(pk=2)
        assign_role(self.user_manager, 'manager')

        self.company = Company.objects.get(pk=1)

        self.manager = BuildingManager.objects.filter(users=self.user_manager).first()

        self.client = APIClient()


    def test_api_filter_technician_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        technicians = Technician.objects.filter(company=self.company)
        response = self.client.get(reverse('technicians-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for technician in response.data:
            self.assert_(technicians.filter(pk=technician['user']).exists())
        
        technician_related = technicians.first()
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician_related.user_id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        technician_not_related = Technician.objects.exclude(company=self.company).first()
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician_not_related.user_id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)


    def test_api_filter_building_manager_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        response = self.client.get(reverse('managers-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for manager in response.data:
            self.assert_(managers.filter(pk=manager['id']).exists())
        
        manager_related = managers.first()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':manager_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        manager_not_related = BuildingManager.objects.exclude(company=self.company).first()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':manager_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_building_manager_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        response = self.client.get(reverse('managers-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for manager in response.data:
            self.assert_(managers.filter(pk=manager['id']).exists())
        
        manager_related = managers.first()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':manager_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        manager_not_related = BuildingManager.objects.exclude(company=self.company).first()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':manager_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)


    def test_api_filter_building_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        buildings = Building.objects.filter(manager__in=managers)

        response = self.client.get(reverse('buildings-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for building in response.data:
            self.assert_(managers.filter(pk=building['manager']).exists())
        
        building_related = buildings.first()
        response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':building_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        building_not_related = Building.objects.exclude(manager__in=managers).first()
        response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':building_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_unit_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        buildings = Building.objects.filter(manager__in=managers)
        units = Unit.objects.filter(building__in=buildings)

        response = self.client.get(reverse('units-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for unit in response.data:
            self.assert_(units.filter(pk=unit['id']).exists())
        
        unit_related = units.first()
        response = self.client.get(
            reverse('units-detail',
            kwargs={'pk':unit_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        unit_not_related = Unit.objects.exclude(building__in=buildings).first()
        response = self.client.get(
            reverse('units-detail',
            kwargs={'pk':unit_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)


    def test_api_filter_building_as_manager(self):
        self.client.force_authenticate(user=self.user_manager)
        buildings = Building.objects.filter(manager=self.manager)

        response = self.client.get(reverse('buildings-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for building in response.data:
            self.assertEqual(building['manager'], self.manager.id)
        
        building_related = buildings.first()
        response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':building_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        building_not_related = Building.objects.exclude(manager=self.manager).first()
        response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':building_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)


    def test_api_filter_unit_as_manager(self):
        self.client.force_authenticate(user=self.user_manager)
        buildings = Building.objects.filter(manager=self.manager)
        units = Unit.objects.filter(building__in=buildings)

        response = self.client.get(reverse('units-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for unit in response.data:
            self.assert_(units.filter(pk=unit['id']).exists())
        
        unit_related = units.first()
        response = self.client.get(
            reverse('units-detail',
            kwargs={'pk':unit_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        unit_not_related = Unit.objects.exclude(building__in=buildings).first()
        response = self.client.get(
            reverse('units-detail',
            kwargs={'pk':unit_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)


    def test_api_filter_service_visits_as_company(self):
            self.client.force_authenticate(user=self.user_company)
            technicians = Technician.objects.filter(company=self.company)
            visits = ServiceVisit.objects.filter(technician__in=technicians)

            response = self.client.get(reverse('visits-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            for visit in response.data:
                self.assert_(visits.filter(pk=visit['id']).exists())
            
            visit_related = visits.first()
            response = self.client.get(
                reverse('visits-detail',
                kwargs={'pk':visit_related.id}), format="json"
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            visit_not_related =ServiceVisit.objects.exclude(technician__in=technicians).first()
            response = self.client.get(
                reverse('visits-detail',
                kwargs={'pk':visit_not_related.id}), format="json"
            )
            self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_tasks_as_company(self):
            self.client.force_authenticate(user=self.user_company)
            tasks = Task.objects.filter(company=self.company)

            response = self.client.get(reverse('tasks-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            for task in response.data:
                self.assert_(tasks.filter(pk=task['id']).exists())
            
            task_related = tasks.first()
            response = self.client.get(
                reverse('tasks-detail',
                kwargs={'pk':task_related.id}), format="json"
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            task_not_related = Task.objects.exclude(company=self.company).first()
            response = self.client.get(
                reverse('tasks-detail',
                kwargs={'pk':task_not_related.id}), format="json"
            )
            self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_profiles_as_company(self):
            self.client.force_authenticate(user=self.user_company)
            profiles = Profile.objects.filter(company=self.company) | Profile.objects.filter(company=None)

            response = self.client.get(reverse('profiles-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            for profile in response.data:
                self.assert_(profiles.filter(pk=profile['id']).exists())
            
            profile_related = profiles.first()
            response = self.client.get(
                reverse('profiles-detail',
                kwargs={'pk':profile_related.id}), format="json"
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            profile_not_related = Profile.objects.exclude(company=self.company).exclude(company=None).first()
            response = self.client.get(
                reverse('profiles-detail',
                kwargs={'pk':profile_not_related.id}), format="json"
            )
            self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_task_completions_as_company(self):
            self.client.force_authenticate(user=self.user_company)
            tasks = Task.objects.filter(company=self.company)
            task_completions = TaskCompletion.objects.filter(task__in=tasks)

            response = self.client.get(reverse('completions-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            for task_completion in response.data:
                self.assert_(task_completions.filter(pk=task_completion['id']).exists())
            
            completion_related = task_completions.first()
            response = self.client.get(
                reverse('completions-detail',
                kwargs={'pk':completion_related.id}), format="json"
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            completion_not_related = TaskCompletion.objects.exclude(task__in=tasks).first()
            response = self.client.get(
                reverse('completions-detail',
                kwargs={'pk':completion_not_related.id}), format="json"
            )
            self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_profile_plans_as_company(self):
            self.client.force_authenticate(user=self.user_company)
            profiles = Profile.objects.filter(company=self.company)
            plans = ProfilePlan.objects.filter(profile__in=profiles)

            response = self.client.get(reverse('plans-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            for plan in response.data:
                self.assert_(plans.filter(pk=plan['id']).exists())
            
            plan_related = plans.first()
            response = self.client.get(
                reverse('plans-detail',
                kwargs={'pk':plan_related.id}), format="json"
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            plan_not_related = ProfilePlan.objects.exclude(profile__in=profiles).first()
            response = self.client.get(
                reverse('plans-detail',
                kwargs={'pk':plan_not_related.id}), format="json"
            )
            self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_profiles_as_manager(self):
        self.client.force_authenticate(user=self.user_manager)
        buildings = Building.objects.filter(manager=self.manager)
        units = Unit.objects.filter(building__in=buildings)
        plans = ProfilePlan.objects.filter(unit__in=units)
        profiles = Profile.objects.filter(plans__in=plans) | Profile.objects.filter(company=None)
        profiles = profiles.distinct()

        response = self.client.get(reverse('profiles-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for profile in response.data:
            self.assert_(profiles.filter(pk=profile['id']).exists())
        
        profile_related = profiles.first()
        response = self.client.get(
            reverse('profiles-detail',
            kwargs={'pk':profile_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        profile_not_related = Profile.objects.exclude(company=self.company).exclude(company=None).first()
        response = self.client.get(
            reverse('profiles-detail',
            kwargs={'pk':profile_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)