from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from . import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("user/", views.UserAPIView.as_view(), name="login"),
    path("register/", views.RegisterUserAPIView.as_view(), name="register"),
    path("units", views.apiUnits, name="units-list"),
    path("units/<int:pk>/", views.apiUnit, name="units-detail"),
    path("units/<int:pk>/records/", views.apiUnitRecords, name="units-records"),
    path(
        "units/<int:pk>/refrigerant/",
        views.apiRefrigerantReport,
        name="units-refrigerant",
    ),
    path("managers", views.apiManagers, name="managers-list"),
    path("managers/<int:pk>/", views.apiManager, name="managers-detail"),
    path("technicians", views.apiTechnicians, name="technicians-list"),
    path("technicians/<int:pk>/", views.apiTechnician, name="technicians-detail"),
    path("buildings", views.apiBuildings, name="buildings-list"),
    path("buildings/<int:pk>/", views.apiBuilding, name="buildings-detail"),
    path("companies", views.apiCompanies, name="companies-list"),
    path("companies/<int:pk>/", views.apiCompany, name="companies-detail"),
    path("tasks", views.apiTasks, name="tasks-list"),
    path("tasks/<int:pk>/", views.apiTask, name="tasks-detail"),
    path("profiles", views.apiProfiles, name="profiles-list"),
    path("profiles/<int:pk>/", views.apiProfile, name="profiles-detail"),
    path("buildings", views.apiBuildings, name="buildings-list"),
    path("buildings/<int:pk>/", views.apiBuilding, name="buildings-detail"),
    path("plans", views.apiProfilePlans, name="plans-list"),
    path("plans/<int:pk>/", views.apiProfilePlan, name="plans-detail"),
    path("visits", views.apiVisits, name="visits-list"),
    path("visits/<int:pk>/", views.apiVisit, name="visits-detail"),
    path("completions", views.apiCompletions, name="completions-list"),
    path("completions/<int:pk>/", views.apiCompletion, name="completions-detail"),
    path(
        "password-set/<uidb64>/<token>/",
        views.PasswordTokenCheckAPI.as_view(),
        name="password-set-confirm",
    ),
    path(
        "password-set-complete/",
        views.SetPasswordAPIView.as_view(),
        name="password-set-complete",
    ),
]
