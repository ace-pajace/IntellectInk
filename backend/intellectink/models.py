from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

class Courses(models.Model):
    course_id = models.AutoField(primary_key=True)
    term = models.CharField(max_length=255)
    edition = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

class Users(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, blank=False)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    title = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255, null=True)
    surname = models.CharField(max_length=255, null=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. ',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )

class Directories(models.Model):
    directory_id = models.AutoField(primary_key=True)
    parent_directory = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)

class Files(models.Model):
    file_id = models.AutoField(primary_key=True)
    parent_directory = models.ForeignKey(Directories, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    data = models.FileField(upload_to='uploaded_files/')

class CourseAccess(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    access_level = models.IntegerField() # Proponuję -> 1 zwykły, 2 koordynator, 3 twórca, ew. 0 brak

    class Meta:
        unique_together = ('course', 'user')
