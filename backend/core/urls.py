from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CompanyViewSet, PlanViewSet, RoleViewSet, UserViewSet,
    RegisterCompanyView
)
from .authentication import CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'plans', PlanViewSet)
router.register(r'roles', RoleViewSet)
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('register-company/', RegisterCompanyView.as_view(), name='register-company'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
]
