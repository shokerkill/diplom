from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.


class Question(models.Model):
    text = models.CharField(max_length=300)
    answerA = models.CharField(max_length=200)
    answerB = models.CharField(max_length=200)
    answerC = models.CharField(max_length=200, blank=True)
    answerD = models.CharField(max_length=200, blank=True)
    answerE = models.CharField(max_length=200, blank=True)
    correct = models.IntegerField(verbose_name='correct_answer', blank=True)
    image = models.ImageField(verbose_name='image_field', blank=True)

    def __str__(self):
        return self.text


class Operator(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.TextField(max_length=100, blank=True, default='student')
    location = models.CharField(max_length=30, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username


class Test(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    start = models.DateTimeField(auto_now=True)
    finish = models.DateTimeField(blank=True, null=True)
    questions = models.ManyToManyField(Question)

    # def __str__(self):
    #     return self.id


class Answers(models.Model):
    who = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.IntegerField(null=True, blank=True)


class Result(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    percentage = models.IntegerField(blank=True, null=True, default=0)

