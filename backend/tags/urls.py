from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagViewSet

router = DefaultRouter()
router.register(r'', TagViewSet)  # <- Use r'' para que /api/tags/ seja o endpoint!

urlpatterns = [
    path('', include(router.urls)),
]
