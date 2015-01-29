# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20141214_0645'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='text',
            field=models.CharField(default=datetime.datetime(2014, 12, 14, 7, 51, 2, 323905, tzinfo=utc), max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='dob',
            field=models.DateField(default=datetime.datetime(2014, 12, 14, 7, 50, 40, 622492)),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='picture',
            field=models.ImageField(default=b'profile_images/new_user.png', upload_to=b'profile_images/', blank=True),
            preserve_default=True,
        ),
    ]
