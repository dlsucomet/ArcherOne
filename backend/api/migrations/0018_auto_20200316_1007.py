# Generated by Django 3.0.4 on 2020-03-16 10:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20200313_0337'),
    ]

    operations = [
        migrations.CreateModel(
            name='CoursePriority',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.BooleanField()),
                ('courses', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('earliest_class_time', models.TimeField(null=True, verbose_name='earliest class time')),
                ('latest_class_time', models.TimeField(null=True, verbose_name='latest class time')),
                ('break_length', models.TimeField(null=True, verbose_name='break length')),
                ('min_courses', models.IntegerField(null=True, verbose_name='min courses per day')),
                ('max_courses', models.IntegerField(null=True, verbose_name='max courses per day')),
                ('course_priority', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.CoursePriority')),
                ('preferred_buildings', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Building')),
                ('preferred_days', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Day')),
                ('preferred_faculty', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Faculty')),
                ('preferred_sections', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Section')),
            ],
            options={
                'verbose_name': 'preference',
                'verbose_name_plural': 'preferences',
            },
        ),
        migrations.RemoveField(
            model_name='lowprioritycourselist',
            name='courses',
        ),
        migrations.RemoveField(
            model_name='preferencelist',
            name='highCourses',
        ),
        migrations.RemoveField(
            model_name='preferencelist',
            name='lowCourses',
        ),
        migrations.RemoveField(
            model_name='preferencelist',
            name='preferred_buildings',
        ),
        migrations.RemoveField(
            model_name='preferencelist',
            name='preferred_days',
        ),
        migrations.RemoveField(
            model_name='preferencelist',
            name='preferred_faculty',
        ),
        migrations.RemoveField(
            model_name='preferencelist',
            name='preferred_sections',
        ),
        migrations.RemoveField(
            model_name='user',
            name='PreferenceList',
        ),
        migrations.DeleteModel(
            name='HighPriorityCourseList',
        ),
        migrations.DeleteModel(
            name='LowPriorityCourseList',
        ),
        migrations.DeleteModel(
            name='PreferenceList',
        ),
        migrations.AddField(
            model_name='preference',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]