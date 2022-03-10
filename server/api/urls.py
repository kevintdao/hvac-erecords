from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/', views.UserAPIView.as_view(), name='login'),
    path('api/register/', views.RegisterUserAPIView.as_view(), name='register'),
    path('units',views.apiUnits, name = 'units-list'),
    path('units/<int:pk>/',views.apiUnit, name = 'units-detail'),
    path('managers',views.apiManagers, name = 'managers-list'),
    path('managers/<int:pk>/',views.apiManager, name = 'managers-detail'),
    path('technicians', views.apiTechnicians, name='technicians-list'),
    path('technicians/<int:pk>/', views.apiTechnician, name='technicians-detail'),
    path('buildings', views.apiBuildings, name='buildings-list'),
    path('buildings/<int:pk>/', views.apiBuilding, name='buildings-detail'),
]
