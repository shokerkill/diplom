# Generated by Django 2.0.5 on 2018-05-07 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question_server', '0003_auto_20180427_1642'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='image',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
