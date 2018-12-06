from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

from django.core.validators import MaxValueValidator


class Player(AbstractUser):
    points = models.PositiveIntegerField(validators=[MaxValueValidator(1000000)], default=0)
