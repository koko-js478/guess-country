from random import randint

from world.models import WorldBorder
from rest_framework import viewsets
from api.serializers import WorldRandomCountrySerializer, WorldCountriesSerializer
from rest_framework.decorators import action
from django.http import HttpResponse
from django.shortcuts import get_list_or_404


class WorldCountriesViewSet(viewsets.ReadOnlyModelViewSet):
    """Returns world countries"""
    queryset = WorldBorder.objects.all()
    serializer_class = WorldCountriesSerializer

    @action(methods=['get'], detail=False)
    def random(self, request, pk=None):
        random_index = randint(1, self.queryset.count()-1)
        random_country = get_list_or_404(WorldBorder, pk=random_index)

        page = self.paginate_queryset(random_country)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(random_country, many=True)
        return HttpResponse(serializer.data)
