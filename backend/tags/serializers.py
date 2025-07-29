from rest_framework import serializers
from .models import Tag

class TagSerializer(serializers.ModelSerializer):
    contactCount = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = '__all__'

    def get_contactCount(self, obj):
        return obj.contacts.count()
