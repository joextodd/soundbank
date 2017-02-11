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
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "soundbank.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
