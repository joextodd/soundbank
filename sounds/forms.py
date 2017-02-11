"""
forms.py

Contains form classes for uploading tracks.
"""
from django import forms
from sounds.models import Track


class UploadForm(forms.ModelForm):
    """ Form to upload a new track """

    class Meta:
        model = Track
        fields = ['title', 'genre', 'image', 'track']