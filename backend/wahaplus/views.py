import os
import json
import requests
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

from wahaplus.models import WahaCallLog  # Importa o model de log

WAHA_URL = os.environ.get("WAHA_URL", "http://localhost:3000/api")  # Use o nome do serviço do docker-compose

# Helper para logar chamada
def log_call(endpoint, method, request_data, response_data, status_code):
    WahaCallLog.objects.create(
        endpoint=endpoint,
        method=method,
        request_data=json.dumps(request_data) if request_data else None,
        response_data=json.dumps(response_data) if response_data else None,
        status_code=status_code,
    )

# ========== SESSIONS ==========

def list_sessions(request):
    r = requests.get(f"{WAHA_URL}/sessions/")
    log_call('/sessions/', 'GET', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json(), safe=False)

@csrf_exempt
@require_http_methods(["POST"])
def create_session(request):
    data = json.loads(request.body)
    r = requests.post(f"{WAHA_URL}/sessions/", json=data)
    log_call('/sessions/', 'POST', data, r.json(), r.status_code)
    return JsonResponse(r.json(), status=r.status_code)

@csrf_exempt
@require_http_methods(["POST"])
def start_session(request):
    session = request.GET.get("session", "default")
    r = requests.post(f"{WAHA_URL}/sessions/{session}/start")
    log_call(f'/sessions/{session}/start', 'POST', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json(), status=r.status_code)

@csrf_exempt
@require_http_methods(["POST"])
def stop_session(request):
    session = request.GET.get("session", "default")
    r = requests.post(f"{WAHA_URL}/sessions/{session}/stop")
    log_call(f'/sessions/{session}/stop', 'POST', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json(), status=r.status_code)

def get_qr(request):
    session = request.GET.get("session", "default")
    r = requests.get(f"{WAHA_URL}/{session}/auth/qr?format=raw")
    log_call(f'/{session}/auth/qr', 'GET', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json())

# ========== MESSAGES ==========

@csrf_exempt
@require_http_methods(["POST"])
def send_text(request):
    payload = json.loads(request.body)
    r = requests.post(f"{WAHA_URL}/sendText", json=payload)
    log_call('/sendText', 'POST', payload, r.json(), r.status_code)
    return JsonResponse(r.json(), status=r.status_code)

def get_messages(request):
    session = request.GET.get("session", "default")
    chatId = request.GET.get("chatId")
    if not chatId:
        return HttpResponseBadRequest("Informe o chatId")
    r = requests.get(f"{WAHA_URL}/messages", params={
        "session": session,
        "chatId": chatId,
        "limit": 50,
        "downloadMedia": "false"
    })
    log_call('/messages', 'GET', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json(), safe=False)

# ========== CONTACTS ==========

def list_contacts(request):
    session = request.GET.get("session", "default")
    r = requests.get(f"{WAHA_URL}/contacts", params={"session": session})
    log_call('/contacts', 'GET', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json(), safe=False)

def check_contact(request):
    session = request.GET.get("session", "default")
    phone = request.GET.get("phone")
    if not phone:
        return HttpResponseBadRequest("Informe o phone")
    r = requests.get(f"{WAHA_URL}/contacts/check-exists", params={
        "session": session,
        "phone": phone
    })
    log_call('/contacts/check-exists', 'GET', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json())

def get_contact_about(request):
    session = request.GET.get("session", "default")
    contactId = request.GET.get("contactId")
    if not contactId:
        return HttpResponseBadRequest("Informe o contactId")
    r = requests.get(f"{WAHA_URL}/contacts/about", params={
        "session": session,
        "contactId": contactId
    })
    log_call('/contacts/about', 'GET', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json())

def get_profile_picture(request):
    session = request.GET.get("session", "default")
    contactId = request.GET.get("contactId")
    if not contactId:
        return HttpResponseBadRequest("Informe o contactId")
    r = requests.get(f"{WAHA_URL}/contacts/profile-picture", params={
        "session": session,
        "contactId": contactId
    })
    log_call('/contacts/profile-picture', 'GET', dict(request.GET), r.json(), r.status_code)
    return JsonResponse(r.json())

@csrf_exempt
@require_http_methods(["POST"])
def block_contact(request):
    payload = json.loads(request.body)
    r = requests.post(f"{WAHA_URL}/contacts/block", json=payload)
    log_call('/contacts/block', 'POST', payload, r.json(), r.status_code)
    return JsonResponse(r.json(), status=r.status_code)

@csrf_exempt
@require_http_methods(["POST"])
def unblock_contact(request):
    payload = json.loads(request.body)
    r = requests.post(f"{WAHA_URL}/contacts/unblock", json=payload)
    log_call('/contacts/unblock', 'POST', payload, r.json(), r.status_code)
    return JsonResponse(r.json(), status=r.status_code)
