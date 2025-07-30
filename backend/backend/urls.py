from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import SidebarStatsView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Coloque aqui:
    path("api/sidebar-stats/", SidebarStatsView.as_view()),

    # Suas rotas principais
    path('api/', include('core.urls')),
    path('api/search/', include('search.urls')),
    path('api/waha/', include('wahaplus.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('api/tags/', include('tags.urls')),

    # Endpoints JWT para autenticação
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
