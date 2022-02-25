from django.urls import path
from . import views

urlpatterns = [
    path('managers',views.getData, name = 'managers-list'),
    path('managers/add/',views.addManager, name = 'managers-add'),
]