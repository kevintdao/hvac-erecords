from django.urls import path
from . import views

urlpatterns = [
    path('technicians', views.apiTechnicians, name='technicians-list'),
    path('technician/<int:pk>/', views.apiTechnician, name='technicians-detail')
]
