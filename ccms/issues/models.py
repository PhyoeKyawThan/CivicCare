from django.db import models
import uuid
from django.utils.timezone import now
from user.models import User

class IssueType(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return self.name

class Issue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='issues'
    )

    issue_type = models.ForeignKey(
        IssueType,
        on_delete=models.PROTECT,
        related_name='issues'
    )

    title = models.CharField(max_length=200)
    description = models.TextField()

    STATUS_CHOICES = (
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')

    PRIORITY_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    )
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')

    location_latitude = models.DecimalField(
        max_digits=10, decimal_places=8, null=True, blank=True
    )
    location_longitude = models.DecimalField(
        max_digits=11, decimal_places=8, null=True, blank=True
    )

    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)
    closed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

class IssueAttachment(models.Model):
    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE,
        related_name='attachments'
    )

    file = models.FileField(upload_to='issue_attachments/')
    file_type = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"Attachment for {self.issue.title}"
