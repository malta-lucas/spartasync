from django.contrib import admin
from .models import Tag

class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'color', 'created_at', 'last_use', 'updated_at']
    search_fields = ['title', 'content']
    list_filter = ['color']
