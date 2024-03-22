from django.db import models

class Courses(models.Model):
    course_id = models.AutoField(primary_key=True)
    term = models.CharField(max_length=255)
    edition = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

class Users(models.Model):
    email = models.CharField(max_length=255, primary_key=True)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    title = models.CharField(max_length=255)

class Directories(models.Model):
    directory_id = models.AutoField(primary_key=True)
    parent_directory = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)

class Files(models.Model):
    file_id = models.AutoField(primary_key=True)
    parent_directory = models.ForeignKey(Directories, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    data = models.FileField(upload_to='uploaded_files/')

class CourseAccess(models.Model):
    course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    access_level = models.IntegerField()

    class Meta:
        unique_together = ('course', 'user')
