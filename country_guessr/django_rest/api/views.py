from random import randint

from world.models import WorldBorder
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from api.serializers import WorldCountriesSerializer
from rest_framework.decorators import action
from django.http import HttpResponse
from django.shortcuts import get_list_or_404
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

import json

class WorldCountriesViewSet(viewsets.ReadOnlyModelViewSet):
    """Returns world countries
    get:
    Returns all countries in paginated format
    """
    permission_classes = (AllowAny,)
    queryset = WorldBorder.objects.all()
    serializer_class = WorldCountriesSerializer
    lookup_field = 'name'

    @action(methods=['get'], detail=False)
    def random(self, request, pk=None):
        """
        get:
        Returns a random country
        """
        random_index = randint(1, self.queryset.count()-1)
        random_country = get_list_or_404(WorldBorder, pk=random_index)

        page = self.paginate_queryset(random_country)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(random_country, many=True)
        return HttpResponse(serializer.data)

@api_view(['PATCH'])
@permission_classes((AllowAny, ))
def increment_points(request):
    #   Try to load JSON if token passed as JSON, else assume entire body is token
    try:
        data = json.loads(request.body)
        valid_data = VerifyJSONWebTokenSerializer().validate(data)
        user = valid_data['user']
    except (TypeError, json.JSONDecodeError):
        return Response({"detail": "Invalid token."}, status.HTTP_400_BAD_REQUEST)

    user.points += 1
    user.save()

    return Response({"detail": "Successfully incremented."}, status.HTTP_200_OK)
