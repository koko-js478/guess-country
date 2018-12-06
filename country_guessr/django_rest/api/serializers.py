from world.models import WorldBorder
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model


class WorldRandomCountrySerializer(GeoFeatureModelSerializer):
    """Serializes a random world country"""
    class Meta:
        model = WorldBorder
        fields = ('name', 'name', 'lon', 'lat', 'mpoly')
        geo_field = "mpoly"


class WorldCountriesSerializer(GeoFeatureModelSerializer):
    """Serializes all world countries"""
    class Meta:
        model = WorldBorder
        fields = ('name', 'name', 'lon', 'lat', 'mpoly')
        geo_field = "mpoly"


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    django_rest_auth User model w/o password
    """
    class Meta:
        model = get_user_model()
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'points')
        read_only_fields = ('email', )
