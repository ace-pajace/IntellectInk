# Generated by Django 4.1 on 2024-03-26 16:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('term', models.CharField(max_length=255)),
                ('edition', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Directories',
            fields=[
                ('directory_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intellectink.courses')),
                ('parent_directory', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='intellectink.directories')),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('email', models.EmailField(max_length=254, primary_key=True, serialize=False, unique=True)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255, null=True)),
                ('name', models.CharField(max_length=255, null=True)),
                ('surname', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Files',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('data', models.FileField(upload_to='uploaded_files/')),
                ('parent_directory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intellectink.directories')),
            ],
        ),
        migrations.CreateModel(
            name='CourseAccess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('access_level', models.IntegerField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intellectink.courses')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intellectink.users')),
            ],
            options={
                'unique_together': {('course', 'user')},
            },
        ),
    ]