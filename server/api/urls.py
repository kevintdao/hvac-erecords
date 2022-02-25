from django.urls import path
from . import views

urlpatterns = [
    path('units',views.apiUnits, name = 'units-list'),
    path('units/<int:pk>/',views.apiUnit, name = 'units-detail'),
]