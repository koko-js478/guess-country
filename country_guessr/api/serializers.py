from world.models import WorldBorder
from rest_framework import serializers


class WorldRandomCountrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorldBorder
        fields = ('name', 'name', 'lon', 'lat', 'mpoly')
