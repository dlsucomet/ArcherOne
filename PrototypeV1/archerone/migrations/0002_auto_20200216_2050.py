# Generated by Django 3.0.3 on 2020-02-16 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('archerone', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=100, verbose_name='first name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=100, verbose_name='last name'),
        ),
    ]
