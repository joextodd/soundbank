from django.contrib import admin
from sounds.models import Track


class TrackAdmin(admin.ModelAdmin):
    pass


admin.site.register(Track, TrackAdmin)
