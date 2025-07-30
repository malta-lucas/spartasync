from core.admin import master_admin_site
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import SidebarStatsView

urlpatterns = [
    # Só o admin customizado!
    path('admin/', master_admin_site.urls),

    # Demais rotas da sua API/app
    path("api/sidebar-stats/", SidebarStatsView.as_view()),
    path('api/', include('core.urls')),
    path('api/search/', include('search.urls')),
    path('api/waha/', include('wahaplus.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('api/tags/', include('tags.urls')),
    path('api/', include('modules.urls')),

    # JWT endpoints
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
