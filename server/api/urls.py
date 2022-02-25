from django.urls import path
from . import views

urlpatterns = [
    path('managers',views.getData, name = 'managers-list'),
    path('managers/add/',views.addManager, name = 'managers-add'),
    path('managers/<int:pk>/',views.getManager, name = 'managers-detail'),
    path('managers/<int:pk>/edit',views.updateManager, name = 'managers-edit'),
]