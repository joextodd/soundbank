# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-02-12 00:13
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sounds', '0005_auto_20170211_2345'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Artist',
        ),
    ]
