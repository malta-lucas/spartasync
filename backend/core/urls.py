from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CompanyViewSet, PlanViewSet, RoleViewSet, UserViewSet,
    RegisterCompanyView, MeView
)
from .authentication import CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'plans', PlanViewSet)
router.register(r'roles', RoleViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register-company/', RegisterCompanyView.as_view(), name='register-company'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('auth/me/', MeView.as_view(), name='me'),
]
