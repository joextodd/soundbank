from django.contrib import admin
from sounds.models import Artist, Track


class ArtistAdmin(admin.ModelAdmin):
    pass


class TrackAdmin(admin.ModelAdmin):
    pass


admin.site.register(Artist, ArtistAdmin)
admin.site.register(Track, TrackAdmin)
