# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-02 23:05
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sounds', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='image',
        ),
        migrations.RemoveField(
            model_name='track',
            name='track',
        ),
        migrations.AlterField(
            model_name='track',
            name='artist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
