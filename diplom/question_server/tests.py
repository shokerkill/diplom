import datetime
from django.test import TestCase

from question_server.models import Test, Answers, Question, Result
from django.contrib.auth.models import User  # Required to assign User as a borrower


class LoanedBookInstancesByUserListViewTest(TestCase):

    def setUp(self):
        # Создание двух пользователей
        test_user1 = User.objects.create_user(username='testuser1', password='12345')
        test_user1.save()
        test_user2 = User.objects.create_user(username='testuser2', password='12345')
        test_user2.save()

        # Создание теста

        self.test_exam = Test(author=test_user1, name='Test_Name', start=datetime.datetime.now()).save()

        # Create questions

        for i in range(10):
            Question.objects.create({
                'text': 'Test Question {}.format(i)',
                'answerA': 'Answer A {}'.format(i),
                'answerB': 'Answer B {}'.format(i),
                'answerC': 'Answer C {}'.format(i),
                'answerD': 'Answer D {}'.format(i),
                'answerE': 'Answer E {}'.format(i),
                'correct': i % 5,
                'image': 'some.url.to.image/{}'.format(i),
                'test': self.test_exam

            })

        # Создание 30 объектов BookInstance

    def test_questions_acquired(self):
        resp = self.client.get('questions/{}/'.format(self.test_exam))
        self.assertNotEqual(resp, {})

    def test_logged_in_uses_correct_template(self):
        resp = self.client.get('token')

        # Проверка что пользователь залогинился
        self.assertEqual(str(resp.context['user']), 'testuser1')
        # Check that we got a response "success"
        self.assertEqual(resp.status_code, 200)
