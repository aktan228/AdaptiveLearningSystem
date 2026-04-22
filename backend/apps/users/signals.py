from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User, UserProfile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    # 'instance' — это сам объект User, который только что сохранился
    # 'created' — это булево значение (True, если пользователь создан с нуля)
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)   
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()