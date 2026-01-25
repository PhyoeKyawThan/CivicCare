import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    full_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True, null=False)
    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    date_of_birth = models.DateTimeField(default=None, null=False)

    ROLE_CHOICES = (
        ('citizen', 'Citizen'),
        ('administrator', 'Administrator'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='citizen')

    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username
