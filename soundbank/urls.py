"""
urls.py

SoundBank URL Configuration
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include
from django.contrib.auth.views import login, logout

import soundbank.views as main_views
import sounds.views as sound_views

urlpatterns = [
    url(r'^$', sound_views.DiscoverView.as_view()),
    url(r'^discover/', sound_views.DiscoverView.as_view()),
    url(r'^upload/', sound_views.UploadView.as_view()),
    url(r'^account/', sound_views.AccountView.as_view()),
    url(r'^sign/', sound_views.SignedS3Request.as_view()),
    url(r'^delete/(?P<pk>\d+)', sound_views.DeleteTrack.as_view()),
    url(r'^register/', main_views.RegisterView.as_view()),
    url(r'^login/', login, {'template_name': 'login.html'}),
    url(r'^logout/', logout, {'next_page': '/discover'}),
    url(r'^admin/', admin.site.urls),
]
