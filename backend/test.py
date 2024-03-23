from intellectink.models import Users
from django.test import TestCase


class UserTestCase(TestCase):
    def setUp(self):

        Users.objects.create(email='babla@student.agh.edu.pl', username='ik', password='verysecret', title='dr inz.', name="Ignacy", surname='Kowalski')
        Users.objects.create(email='luca@student.agh.edu.pl', username='jj', password='1234', title='prof', name="Jan", surname='Jankowski')

    def test_user_creation(self):
        user = Users.objects.get(email='babla@student.agh.edu.pl')
        self.assertEqual(user.username, 'ik')
        user = Users.objects.get(email='luca@student.agh.edu.pl')
        self.assertEqual(user.username, 'jj')


    def tearDown(self):
        bable = Users.objects.get(email='babla@student.agh.edu.pl')
        luca = Users.objects.get(email='luca@student.agh.edu.pl')
        bable.delete()
        luca.delete()


if __name__ == '__main__':
    print("Hello World!")
