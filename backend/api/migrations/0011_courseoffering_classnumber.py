# Generated by Django 3.0.5 on 2020-04-01 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20200401_1421'),
    ]

    operations = [
        migrations.AddField(
            model_name='courseoffering',
            name='classnumber',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
