# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='MAC',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='dob',
            field=models.DateField(default=datetime.datetime(2014, 12, 14, 6, 45, 27, 645056)),
            preserve_default=True,
        ),
    ]
