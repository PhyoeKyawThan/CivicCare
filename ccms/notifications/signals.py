from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now
from .models import Issue, Notification


@receiver(post_save, sender=Issue)
def issue_notifications(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            title="Issue Submitted",
            body=f'Your issue "{instance.title}" has been submitted.',
            ref_url=f'/issues/{instance.id}',
            type='info'
        )
    else:
        if instance.closed_at:
            Notification.objects.create(
                user=instance.user,
                title="Issue Closed",
                body=f'Your issue "{instance.title}" has been closed.',
                ref_url=f'/issues/{instance.id}',
                type='success'
            )
