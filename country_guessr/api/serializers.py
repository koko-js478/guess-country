from world.models import WorldBorder
from rest_framework import serializers


class WorldRandomCountrySerializer(serializers.HyperlinkedModelSerializer):
    """Serializes a random world country"""
    class Meta:
        model = WorldBorder
        fields = ('name', 'name', 'lon', 'lat', 'mpoly')


class WorldCountriesSerializer(serializers.HyperlinkedModelSerializer):
    """Serializes all world countries"""
    class Meta:
        model = WorldBorder
        fields = ('name', 'name', 'lon', 'lat', 'mpoly')
