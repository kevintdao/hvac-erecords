from django.urls import path
from . import views

urlpatterns = [
    path('managers',views.apiManagers, name = 'managers-list'),
    path('managers/<int:pk>/',views.apiManager, name = 'managers-detail'),
]