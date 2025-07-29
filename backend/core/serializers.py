from rest_framework import serializers
from .models import Company, Plan, Role, User

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    role = RoleSerializer(read_only=True)
    plan = PlanSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'phone', 'company',
            'role', 'plan', 'is_active', 'is_staff'
        ]

class RegisterCompanySerializer(serializers.Serializer):
    company_name = serializers.CharField()
    company_type = serializers.CharField(required=False, allow_blank=True)
    admin_email = serializers.EmailField()
    admin_phone = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)
    accept_promo = serializers.BooleanField(default=False)

    def validate_company_name(self, value):
        if Company.objects.filter(name=value).exists():
            raise serializers.ValidationError("Já existe uma empresa com esse nome.")
        return value

    def validate_admin_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Já existe um usuário com esse e-mail.")
        return value

    def validate_admin_phone(self, value):
        if value and User.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Já existe um usuário com esse telefone.")
        return value

    def create(self, validated_data):
        company = Company.objects.create(
            name=validated_data['company_name'],
            company_type=validated_data.get('company_type', '')
        )
        user = User.objects.create_user(
            username=validated_data['admin_email'],
            email=validated_data['admin_email'],
            phone=validated_data.get('admin_phone', ''),
            password=validated_data['password'],
            company=company,
            is_staff=True,
            is_superuser=True
        )
        return user
