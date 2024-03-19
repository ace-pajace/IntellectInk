from django.db import models


class User(models.Model):
    email = models.EmailField(unique=True, blank=False)
    user_name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)


class Subject(models.Model):
    name = models.CharField(max_length=30)


class SubjectEdition(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    start_year = models.IntegerField()
    end_year = models.IntegerField()


class SubjectEditionAccess(models.Model):
    subject_edition = models.ForeignKey(SubjectEdition, on_delete=models.CASCADE)
    access_type = models.IntegerField()             # Proponuję -> 1 zwykły, 2 koordynator, 3 twórca, ew. 0 brak
