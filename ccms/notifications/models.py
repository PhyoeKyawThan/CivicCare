from django.db import models
import uuid
from user.models import User
from django.utils.timezone import now

class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notifications'
    )

    title = models.CharField(max_length=100)
    body = models.CharField(max_length=255, null=True, blank=True)
    ref_url = models.CharField(max_length=200, null=True, blank=True)

    TYPE_CHOICES = (
        ('info', 'Info'),
        ('warning', 'Warning'),
        ('success', 'Success'),
        ('system', 'System'),
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='system')

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=now)
    read_at = models.DateTimeField(null=True, blank=True)

    data = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.title
