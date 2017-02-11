"""
forms.py

Contains form classes for uploading tracks, and
registering new users.
"""
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from sounds.models import Artist


class RegisterForm(UserCreationForm):
    """
    Form to register a user. Saves user
    to django users, and stores name and
    site in Artist model.

    :return: newly created or invalid user
    """
    email = forms.EmailField(required=True)
    site = forms.URLField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'site']

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)

        user.set_password(self.cleaned_data['password2'])
        user.email = self.cleaned_data['email']

        if commit:
            user.save()
            artist = Artist.objects.create(name=self.cleaned_data['username'],
                                           site=self.cleaned_data['site'])
            artist.save()

        return user
