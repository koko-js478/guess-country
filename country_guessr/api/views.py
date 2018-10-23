from random import randint

from world.models import WorldBorder
from rest_framework import viewsets
from api.serializers import WorldRandomCountrySerializer, WorldCountriesSerializer





class WorldCountriesViewSet(viewsets.ModelViewSet):
    """Returns all countries"""
    queryset = WorldBorder.objects.all()
    serializer_class = WorldCountriesSerializer
