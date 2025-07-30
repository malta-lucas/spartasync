# core/authenticator.py (ou onde você personaliza seu TokenObtainPairSerializer)

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import ValidationError
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        identifier = attrs.get('identifier') or attrs.get('username')
        password = attrs.get('password')
        company = attrs.get('company', None)

        user = (
            User.objects.filter(username=identifier).first()
            or User.objects.filter(email=identifier).first()
            or User.objects.filter(phone=identifier).first()
        )
        if not user:
            raise ValidationError({'detail': 'Usuário não encontrado.'})
        if not user.is_active:
            raise ValidationError({'detail': 'Usuário inativo. Entre em contato com o administrador.'})

        if company and hasattr(user, 'company'):
            if (user.company and user.company.name != company and user.company.id != company):
                raise ValidationError({'detail': 'Empresa informada não confere com o cadastro.'})

        if not user.check_password(password):
            raise ValidationError({'detail': 'Senha incorreta.'})

        # Aqui, pega o resultado normal do SimpleJWT (tokens)
        data = super().validate({'username': user.username, 'password': password})
        # Não precisa serializar o usuário aqui!
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Adicione aqui o que quiser ao payload do JWT:
        token['username'] = user.username
        token['email'] = user.email
        token['company'] = {
            'id': user.company.id if user.company else None,
            'name': user.company.name if user.company else None,
            'company_type': user.company.company_type if user.company else None,
        }
        # Você pode adicionar outros campos: 'role', 'is_staff', etc.
        token['is_staff'] = user.is_staff
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
