# Generated by Django 3.0.5 on 2020-04-13 15:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('food_swap', '0002_auto_20200413_1125'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatroom',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='chatroom', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Intermediary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Chatroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medium', to='food_swap.Chatroom')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medium', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
