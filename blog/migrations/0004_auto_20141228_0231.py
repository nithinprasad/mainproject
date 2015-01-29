# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20141214_0751'),
    ]

    operations = [
        migrations.AddField(
            model_name='friend',
            name='status',
            field=models.CharField(default=datetime.datetime(2014, 12, 28, 2, 31, 5, 67882, tzinfo=utc), max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='friend',
            name='user_id',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='post',
            name='pub_date',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 28, 2, 30, 44, 883073), verbose_name=b'date published', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='post',
            name='user_id',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='dob',
            field=models.DateField(default=datetime.datetime(2014, 12, 28, 2, 30, 44, 882502)),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
