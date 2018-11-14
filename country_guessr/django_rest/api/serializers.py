from world.models import WorldBorder
from rest_framework_gis.serializers import GeoFeatureModelSerializer


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
