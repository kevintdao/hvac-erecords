from django.urls import path
from . import views

urlpatterns = [
    path('units',views.apiUnits, name = 'units-list'),
    path('units/<int:pk>/',views.apiUnit, name = 'units-detail'),
    path('managers',views.apiManagers, name = 'managers-list'),
    path('managers/<int:pk>/',views.apiManager, name = 'managers-detail'),
    path('technicians', views.apiTechnicians, name='technicians-list'),
    path('technician/<int:pk>/', views.apiTechnician, name='technicians-detail')
]
