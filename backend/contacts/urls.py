from django.urls import path
from .views import ContactListCreateView, BulkContactView

urlpatterns = [
    path('', ContactListCreateView.as_view(), name='contacts-list-create'),
    path('bulk/', BulkContactView.as_view(), name='contacts-bulk'),
]
