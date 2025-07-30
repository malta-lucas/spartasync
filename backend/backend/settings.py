from pathlib import Path
import os
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

# Segurança
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "django-insecure-hf%51zlpi%z+f$+ijk5l!p)%h+zoep+xp42gw$*c5jo)l&a^%(")
DEBUG = os.environ.get("DJANGO_DEBUG", "True") == "True"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")

# Apps
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    "jazzmin",
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'modules',
    'core',
    'wahaplus',
    'contacts',
    'tags',
    'search',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware", 
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

AUTH_USER_MODEL = 'core.User'


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),     # Tempo do token de acesso (ex: 60 min)
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),        # Tempo do refresh (ex: 7 dias)
}

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True

CSRF_COOKIE_SECURE = False  # Para desenvolvimento sem HTTPS

SESSION_COOKIE_SECURE = False

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Banco de Dados (seleciona PostgreSQL ou SQLite)
USE_POSTGRES = os.environ.get("USE_POSTGRES", "False") == "True"

if USE_POSTGRES:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get("POSTGRES_DB", "spartasync"),
            'USER': os.environ.get("POSTGRES_USER", "lucas"),
            'PASSWORD': os.environ.get("POSTGRES_PASSWORD", "senha_segura"),
            'HOST': os.environ.get("POSTGRES_HOST", "localhost"),  # "db" no Docker, "localhost" fora
            'PORT': os.environ.get("POSTGRES_PORT", "5432"),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Validação de senha
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Localização
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

# Arquivos estáticos
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


JAZZMIN_SETTINGS = {
    "site_title": "Administração Sparta",
    "site_header": "Gerenciamento de Tags",
    "site_brand": "Sparta Sync",
    "welcome_sign": "Bem-vindo ao Painel Administrativo!",
    "copyright": "Sparta Sync",
    "search_model": ["tags.Tag", "contacts.Contact"],
    "user_avatar": None,

    "topmenu_links": [
        {"name": "Documentação", "url": "https://docs.spartasync.com", "new_window": True},
        {"model": "tags.Tag"},
        {"app": "contacts"},
    ],

    "order_with_respect_to": [
        "core.Company",
        "core.Plan",
        "core.Role",
        "core.User",
        "tags.Tag",
        "contacts.Contact",
    ],

    # CORES E FONTE:
    "theme": "cosmo",  # use "darkly", "flatly", "cyborg", etc para dark mode
    "custom_css": "admin/custom.css",  # Seu CSS customizado (opcional)
    "show_sidebar": True,
    "navigation_expanded": True,

    # Botões, textos e badges coloridos:
    "related_modal_active": True,
    "icons": {
        "tags.Tag": "fas fa-tags",
        "contacts.Contact": "fas fa-users",
        "core.User": "fas fa-user-shield",
        "core.Company": "fas fa-building",
        # e por aí vai
    },
    # Tabela mais moderna:
    "changeform_format": "horizontal_tabs",  # ou "collapsible", "single"
}
