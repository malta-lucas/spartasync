from django.db import models

class WahaCallLog(models.Model):
    endpoint = models.CharField(max_length=255)
    method = models.CharField(max_length=10)
    request_data = models.TextField(blank=True, null=True)
    response_data = models.TextField(blank=True, null=True)
    status_code = models.IntegerField(default=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.method} {self.endpoint} ({self.created_at})"
