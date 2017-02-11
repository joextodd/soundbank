"""
views.py

Contains main template controls for SoundBank.
"""
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.views.generic import FormView, TemplateView

from soundbank.forms import RegisterForm


class RegisterView(FormView):
    """
    Form view to register new users.

    """
    template_name = 'register.html'
    form_class = RegisterForm

    def form_valid(self, form):
        form.save(commit=True)
        new_user = authenticate(username=form.cleaned_data['username'],
                                password=form.cleaned_data['password1'])
        login(self.request, new_user)
        return redirect('/upload')


class HomeView(TemplateView):
    template_name = 'home.html'
