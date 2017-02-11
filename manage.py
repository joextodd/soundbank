#!/usr/bin/env python
"""
SoundBank - sources random uploaded tracks to the user.

@help:
	Start postgres server:
		--> postgres -D /usr/local/var/postgres
"""
import os
import sys

if __name__ == "__main__":

	settings = os.environ.get('DJANGO_SETTINGS_MODULE')

	if not settings:
		# Use development settings by default
		os.environ['DJANGO_SETTINGS_MODULE'] = 'soundbank.settings.dev'

	from django.core.management import execute_from_command_line

	execute_from_command_line(sys.argv)
