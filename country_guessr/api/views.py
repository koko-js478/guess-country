from random import randint

from world.models import WorldBorder
from rest_framework import viewsets
from api.serializers import WorldRandomCountrySerializer, WorldCountriesSerializer


class WorldRandomCountryViewSet(viewsets.ModelViewSet):
    """Generates a random country"""
    queryset = WorldBorder.objects.none()
    serializer_class = WorldRandomCountrySerializer

    def get_queryset(self):
        count = WorldBorder.objects.all().count()
        random_index = randint(1, count-1)
        return WorldBorder.objects.filter(pk=random_index)


class WorldCountriesViewSet(viewsets.ModelViewSet):
    """Returns all countries"""
    queryset = WorldBorder.objects.all()
    serializer_class = WorldCountriesSerializer
