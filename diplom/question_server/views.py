import json

from django.contrib.auth.models import User, Group
from django.db.models import Avg
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from question_server.models import Question, Answers
from rest_framework import viewsets, generics
from question_server.serializers import UserSerializer, GroupSerializer, QuestionSerializer
from question_server.models import Test, Result
from django.http import JsonResponse
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

#  curl -H 'Accept: application/json; indent=4' -u shokerkill:soft11appo http://127.0.0.1:8000/questions/2/


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = (IsAuthenticated,)

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows questions to be viewed or edited.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class QuesionFilteredView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuestionSerializer

    def get_queryset(self):
        """
        Filter questions data by some value
        :return:
        """
        text = self.kwargs['text']
        return Question.objects.filter(text=text)


@permission_classes((IsAuthenticated, ))
def create_answer(request):
    who = request.POST.get('user', '')
    question = request.POST.get('question', '')
    answer = request.POST.get('answer', '')
    if who and question and answer:
        if not Answers.objects.filter(who=who, question=question):
            new = Answers(who=who, question=question, answer=answer)
            new.save()
            return JsonResponse({'status': 'ok', 'details': 'answer saved'})
        return JsonResponse({'status': 'error', 'details': 'already exists'})
    return JsonResponse({'status': 'error', 'details': 'not enough data provided'})


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        try:
            Token.objects.get(user=user).delete()
        except:
            pass
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


def solved(usr, test):
    if Result.objects.filter(student=usr, test=test):
        return True
    return False


def mark(perc):
    if perc < 4:
        return 1
    elif 4 <= perc < 10:
        return 2
    elif 10 <= perc < 19:
        return 3
    elif 20 <= perc < 40:
        return 4
    elif 40 <= perc < 56:
        return 5
    elif 56 <= perc < 68:
        return 6
    elif 68 <= perc < 78:
        return 7
    elif 78 <= perc < 90:
        return 8
    elif 90 <= perc < 96:
        return 9
    else:
        return 10


def all_tests_view(request):
    tests = Test.objects.all()
    resp = []
    for test in tests:
        resp.append({'test_id': test.id, 'test_name': test.name, 'solved': solved(request.user, test)})
        print(resp)
    return JsonResponse(resp)


def batch_answers(request):
    if request.method == 'POST':
        data = json.loads(request.raw_post_data)
        test_id = data.get('test_id')
        test = Test.objects.get(id=test_id)
        answers = data.get('answers')
        test_questions = Question.objects.filter(test__id=test_id)
        correct = 0
        if len(answers) == len(test_questions):
            for answer in answers:
                q = Question.objects.get(id=answer['question_id'])
                ans = answer['answer']
                answer_obj = Answers.objects.create(who=request.user, question=q, answer=ans)
                if q.correct == ans:
                    correct += 1
            percentage = int(len(test_questions)/100 * correct)
            result = Result.objects.create(student=request.user, test=test, percentage=percentage, mark=mark(percentage))
            avg = Result.objects.filter(test=test).aggregate(Avg('mark'))
            return JsonResponse({'percentage': percentage, 'correct': correct, 'mark': mark(percentage),
                                 'avg': avg['correct__avg']})
        return JsonResponse({'error': 'not all questions answered'})


def questions_filtered(request, test_id):
    return JsonResponse(list(Question.objects.filter(test__id=test_id).values('text', 'answerA', 'answerB', 'answerC',
                                                                              'answerD', 'answerE', 'image', 'test')))
