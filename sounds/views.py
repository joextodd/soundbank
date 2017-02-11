"""
views.py

Contains template controls for Sounds app.
"""
import os
import urllib

from django.views import View
from django.db.models import F
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect
from django.utils.crypto import get_random_string
from django.views.generic import FormView, TemplateView, ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from sounds.models import Track
from sounds.forms import UploadForm
from sounds.utils import s3_sign_request, s3_delete_object


class DiscoverView(TemplateView):
    """
    Return random track on discover page.
    """
    template_name = 'discover.html'

    def get_context_data(self, **kwargs):
        context = super(DiscoverView, self).get_context_data(**kwargs)
        context['track'] = Track.objects.order_by('?').first()
        context['track'].play_count = F('play_count') + 1
        context['track'].save()
        return context


class UploadView(LoginRequiredMixin, FormView):
    """
    Upload new track.
    """
    login_url = '/login/'
    template_name = 'upload.html'
    form_class = UploadForm

    def form_valid(self, form):
        form.cleaned_data['artist'] = self.request.user

        form.cleaned_data['image'] = urllib.parse.quote(
            form.cleaned_data['image'], ':/'
        )
        form.cleaned_data['track'] = urllib.parse.quote(
            form.cleaned_data['track'], ':/'
        )
        Track.objects.create(**form.cleaned_data)

        return redirect('/')


class AccountView(LoginRequiredMixin, ListView):
    """
    List of uploaded tracks.
    """
    template_name = 'account.html'
    context_object_name = 'track_list'
    paginate_by = 5

    def get_queryset(self):
        return Track.objects.filter(artist=self.request.user)


class SignedS3Request(View):
    """
    Pre sign a request to directly upload to S3.
    Note: Heroku places a timeout on file uploads, so we need
    to go direct.

    If a title hasn't been entered yet, we'll generate a random
    string and use that for storage.
    """
    def get(self, request):
        filename, extension = os.path.splitext(request.GET.get('filename'))
        filetype = request.GET.get('filetype')
        title = request.GET.get('title')
        if title.strip() == '':
            title = get_random_string(length=8)

        if 'image' in filetype:
            name = 'image'
        else:
            name = 'track'

        key = 'media/{user}/{title}/{name}{ext}'.format(user=self.request.user,
            title=title, name=name, ext=extension
        )
        signed = s3_sign_request(key, filetype)
        url = 'https://s3-eu-west-1.amazonaws.com/{bucket}/media/{user}/{title}/{name}{ext}'.format(
            bucket=settings.AWS_S3_BUCKET_NAME, user=self.request.user,
            title=title, name=name, ext=extension
        )

        return JsonResponse({'signed': signed, 'url': url})


class DeleteTrack(View):
    """
    Request from javascript on account page to delete a track.
    """
    def get(self, request, pk):
        track = Track.objects.get(pk=pk)
        track.delete()

        base = 'https://s3-eu-west-1.amazonaws.com/{bucket}/'.format(bucket=settings.AWS_S3_BUCKET_NAME)
        image = track.image.split(base)[1]
        s3_delete_object(image)
        track = track.track.split(base)[1]
        s3_delete_object(track)

        return JsonResponse({'success': 'deleted'})