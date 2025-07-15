from django.db import models

class Contact(models.Model):
    contact_id = models.CharField(max_length=64, unique=True)   # "id": "121144065658968@lid"
    number = models.CharField(max_length=32)
    is_business = models.BooleanField(default=False)
    pushname = models.CharField(max_length=255, blank=True, null=True)
    contact_type = models.CharField(max_length=16, blank=True, null=True)  # "type": "in"
    is_me = models.BooleanField(default=False)
    is_user = models.BooleanField(default=False)
    is_group = models.BooleanField(default=False)
    is_wa_contact = models.BooleanField(default=False)
    is_my_contact = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    user_id = models.CharField(max_length=64, blank=True, null=True)  # pode ser FK depois
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.pushname or self.number} ({self.contact_id})"
