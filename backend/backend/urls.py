from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/waha/', include('wahaplus.urls')),  # <- rotas do app
    path('api/contacts/', include('contacts.urls')),
]