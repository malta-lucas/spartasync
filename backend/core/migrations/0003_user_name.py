# Generated by Django 5.2.4 on 2025-07-30 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_role_name_alter_user_role_rolemodulepermission'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=150, verbose_name='Nome do Usuário'),
        ),
    ]
