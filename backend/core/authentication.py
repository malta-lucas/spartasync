# core/authentication.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
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
        if not user or not user.is_active:
            raise self.fail('no_active_account')

        # (Opcional) filtrar por empresa se desejar
        if company and hasattr(user, 'company'):
            if (user.company and user.company.name != company):
                raise self.fail('no_active_account')

        if not user.check_password(password):
            raise self.fail('no_active_account')

        data = super().validate({'username': user.username, 'password': password})
        # Acrescenta user no response!
        data['user'] = UserSerializer(user).data
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
