# Generated by Django 3.0.5 on 2020-05-01 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.CharField(blank=True, default='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRcEQfF7q7j163x2_R6mMHS2qLwq1CSKziwMtOPkTFAz2Zhjcy1&usqp=CAU', max_length=1000, null=True),
        ),
    ]