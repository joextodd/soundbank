"""
models.py

Contains database models for Artists, Tracks.
"""
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.dispatch import receiver

import sounds.utils as utils


class Artist(models.Model):
    name = models.CharField(max_length=128)
    site = models.URLField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Track(models.Model):
    GENRE_CHOICES = (
        ('Blues', 'Blues',),
        ('Classical', 'Classical',),
        ('Country', 'Country',),
        ('Electronic', 'Electronic',),
        ('Folk', 'Folk',),
        ('Jazz', 'Jazz',),
        ('Punk', 'Punk',),
        ('Reggae', 'Reggae',),
        ('Rock', 'Rock',),
    )
    title = models.CharField(max_length=256)
    artist = models.ForeignKey(User)
    genre = models.CharField(max_length=32, choices=GENRE_CHOICES, blank=True, null=True)  # optional
    track = models.CharField(max_length=256)
    image = models.CharField(max_length=256)
    length = models.DurationField(editable=False, blank=True, null=True)  # optional
    release_date = models.DateField(blank=True, null=True)  # optional
    published_date = models.DateField(auto_now=True)
    #metadata = models.CharField()

    def __str__(self):
        return self.title


@receiver(models.signals.post_delete, sender=Track)
def delete_track(sender, instance, using, **kwargs):
    """ Removes from S3 on delete """
    base = 'https://s3-eu-west-1.amazonaws.com/{bucket}/'.format(bucket=settings.AWS_S3_BUCKET_NAME)
    image = instance.image.split(base)[1]
    utils.s3_delete_object(image)
    track = instance.track.split(base)[1]
    utils.s3_delete_object(track)
