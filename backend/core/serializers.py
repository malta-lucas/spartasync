from rest_framework import serializers
from .models import Company, Plan, Role, User, RoleModulePermission
from modules.models import Module

# Company
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

# Plan
class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

# Module
class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['id', 'name', 'slug', 'description']

# RoleModulePermission (com module embutido)
class RoleModulePermissionSerializer(serializers.ModelSerializer):
    module = ModuleSerializer()
    class Meta:
        model = RoleModulePermission
        fields = ['id', 'module', 'level']

# Role - custom serializer para trazer permissões completas (todos os módulos)
class RoleSerializer(serializers.ModelSerializer):
    module_permissions = serializers.SerializerMethodField()
    module_permissions_write = serializers.ListField(write_only=True, required=False)

    class Meta:
        model = Role
        fields = ['id', 'name', 'module_permissions', 'module_permissions_write']

    def get_module_permissions(self, obj):
        all_modules = Module.objects.filter(is_deleted=False)
        saved_perms = { p.module_id: p for p in obj.module_permissions.all() }
        result = []
        for module in all_modules:
            if module.id in saved_perms:
                perm = saved_perms[module.id]
                result.append({
                    'id': perm.id,
                    'module': ModuleSerializer(module).data,
                    'level': perm.level
                })
            else:
                result.append({
                    'id': None,
                    'module': ModuleSerializer(module).data,
                    'level': 'none'  # Antes era 'edit'
                })
        return result

    def create(self, validated_data):
        module_permissions = validated_data.pop('module_permissions_write', [])
        role = super().create(validated_data)
        self.save_permissions(role, module_permissions)
        return role

    def update(self, instance, validated_data):
        module_permissions = validated_data.pop('module_permissions_write', [])
        role = super().update(instance, validated_data)
        self.save_permissions(role, module_permissions)
        return role

    def save_permissions(self, role, module_permissions):
        from .models import RoleModulePermission, Module
        RoleModulePermission.objects.filter(role=role).delete()
        for perm in module_permissions:
            module_obj = Module.objects.get(slug=perm['module']['slug'])
            RoleModulePermission.objects.create(
                role=role,
                module=module_obj,
                level=perm['level']
            )

# User
class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    role = RoleSerializer(read_only=True)
    plan = PlanSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'name', 'email', 'phone', 'password', 'company',
            'role', 'plan', 'is_active', 'is_staff'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            # 'email': {'required': False},  # deixe como quiser
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


# RegisterCompany
class RegisterCompanySerializer(serializers.Serializer):
    company_name = serializers.CharField()
    company_type = serializers.CharField(required=False, allow_blank=True)
    admin_email = serializers.EmailField()
    admin_phone = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)
    accept_promo = serializers.BooleanField(default=False)

    def validate_company_name(self, value):
        from .models import Company
        if Company.objects.filter(name=value).exists():
            raise serializers.ValidationError("Já existe uma empresa com esse nome.")
        return value

    def validate_admin_email(self, value):
        from .models import User
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Já existe um usuário com esse e-mail.")
        return value

    def validate_admin_phone(self, value):
        from .models import User
        if value and User.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Já existe um usuário com esse telefone.")
        return value

    def create(self, validated_data):
        from .models import Company, User
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
            is_superuser=False  # Altere para False se quiser apenas admin normal
        )
        return user
