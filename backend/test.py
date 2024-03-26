import unittest

from backend.intellectink.models import *
from django.test import TestCase


class UserTestCase(TestCase):
    def setUp(self):

        Users.objects.create(email='babla@student.agh.edu.pl', username='ik', password='verysecret', title='dr inz.', name="Ignacy", surname='Kowalski')
        Users.objects.create(email='luca@student.agh.edu.pl', username='jj', password='1234', title='prof', name="Jan", surname='Jankowski')
        Courses.objects.create(term='II', edition='1', name='Algorytmy i struktury danych')
        Courses.objects.create(term='II', edition='1', name='Logika')

    def test_user_creation(self):
        user = Users.objects.get(email='babla@student.agh.edu.pl')
        self.assertEqual(user.username, 'ik')
        user = Users.objects.get(email='luca@student.agh.edu.pl')
        self.assertEqual(user.username, 'jj')

    def test_course_creation(self):
        count = Courses.objects.filter(name='Algorytmy i struktury danych').count()
        self.assertEqual(count, 1)
        count = Courses.objects.filter(name='Logika').count()
        self.assertEqual(count, 1)
        count = Courses.objects.filter(term='II').count()
        self.assertEqual(count, 2)

    def test_courseaccess_creation(self):
        try:
            course = Courses.objects.get(name='Logika')
        except Courses.DoesNotExist:
            unittest.TestCase.fail()
        try:
            user = Users.objects.get(email='babla@student.agh.edu.pl')
        except Users.DoesNotExist:
            unittest.TestCase.fail()
        courseaccess = CourseAccess.objects.create(course=course, user=user, access_level=2)

        #teraz sprawdzamy, jakimi kursami koordynuje Ignacy Kowalaski
        coordinated_courses = Courses.objects.filter(courseaccess__user='babla@student.agh.edu.pl', courseaccess__access_level=2)
        count = coordinated_courses.count()
        self.assertEqual(count, 1)
        CourseAccess.objects.all().delete()

    def test_directory_creation(self):
        try:
            course = Courses.objects.get(name='Algorytmy i struktury danych')
        except Courses.DoesNotExist:
            unittest.TestCase.fail()
        Directories.objects.create(parent_directory=None, name='root', course=course)
        try:
            directory = Directories.objects.get(name='root')
        except Directories.DoesNotExist:
            unittest.TestCase.fail()

    def tearDown(self):
        bable = Users.objects.get(email='babla@student.agh.edu.pl')
        luca = Users.objects.get(email='luca@student.agh.edu.pl')
        bable.delete()
        luca.delete()
        Courses.objects.all().delete()



if __name__ == '__main__':
    print("Hello World!")
