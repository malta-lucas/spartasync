from django.urls import path
from . import views

urlpatterns = [
    path('sessions/', views.list_sessions),  # GET e POST (criar sessão)
    path('sessions/start/', views.start_session),
    path('sessions/stop/', views.stop_session),
    path('sessions/qr/', views.get_qr),

    path('messages/send/', views.send_text),
    path('messages/', views.get_messages),

    path('contacts/', views.list_contacts),
    path('contacts/check/', views.check_contact),
    path('contacts/about/', views.get_contact_about),
    path('contacts/photo/', views.get_profile_picture),
    path('contacts/block/', views.block_contact),
    path('contacts/unblock/', views.unblock_contact),
]
