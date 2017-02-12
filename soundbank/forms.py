"""
forms.py

Contains form classes for uploading tracks, and
registering new users.
"""
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class RegisterForm(UserCreationForm):
    """
    Form to register a user. Saves user
    to django users, and stores name and
    site in Artist model.

    :return: newly created or invalid user
    """
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)

        user.set_password(self.cleaned_data['password2'])
        user.email = self.cleaned_data['email']

        if commit:
            user.save()

        return user
