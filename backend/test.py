from intellectink.models import User
from django.test import TestCase


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(email='babla@student.agh.edu.pl', user_name='bable', password='verysecret')
        User.objects.create(email='luca@student.agh.edu.pl', user_name='luca', password='neverguess')

    def test_user_creation(self):
        user = User.objects.get(email='babla@student.agh.edu.pl')
        self.assertEqual(user.user_name, 'bable')
        user = User.objects.get(email='luca@student.agh.edu.pl')
        self.assertEqual(user.user_name, 'luca')

    def tearDown(self):
        bable = User.objects.get(email='babla@student.agh.edu.pl')
        luca = User.objects.get(email='luca@student.agh.edu.pl')
        bable.delete()
        luca.delete()


if __name__ == '__main__':
    print("Hello World!")
