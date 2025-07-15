# wahaplus/admin.py

from django.contrib import admin
from .models import WahaCallLog
import requests

@admin.register(WahaCallLog)
class WahaCallLogAdmin(admin.ModelAdmin):
    list_display = ("endpoint", "method", "status_code", "created_at")
    actions = ["test_get_sessions"]

    def test_get_sessions(self, request, queryset):
        # Exemplo: GET na API WAHA (ajuste endpoint conforme o seu)
        url = "http://wahaplus:3000/api/sessions/"
        r = requests.get(url)
        self.message_user(request, f"Status: {r.status_code}, Response: {r.text}")
    test_get_sessions.short_description = "Testar GET Sessions da API WAHA"
