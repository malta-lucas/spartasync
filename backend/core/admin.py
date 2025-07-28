from django.contrib import admin
from .models import Company, Plan, Role, User

admin.site.register(Company)
admin.site.register(Plan)
admin.site.register(Role)
admin.site.register(User)
