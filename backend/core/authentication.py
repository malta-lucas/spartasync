# core/authentication.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Aceita identifier (username, email ou phone)
    def validate(self, attrs):
        identifier = attrs.get('identifier') or attrs.get('username')
        password = attrs.get('password')
        company = attrs.get('company', None)

        # Busca usuário por username, email ou phone
        user = (
            User.objects.filter(username=identifier).first()
            or User.objects.filter(email=identifier).first()
            or User.objects.filter(phone=identifier).first()
        )

        if not user:
            raise self.fail('no_active_account')

        # (Opcional) Se quiser filtrar pela empresa:
        if company and hasattr(user, 'company'):
            if (user.company and user.company.name != company):
                raise self.fail('no_active_account')

        # Valida a senha
        if not user.check_password(password):
            raise self.fail('no_active_account')

        # Passa user para super (gera token)
        data = super().validate({'username': user.username, 'password': password})
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
