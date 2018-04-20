from django.contrib.auth.models import User, Group
from question_server.models import Question
from rest_framework import viewsets, generics
from question_server.serializers import UserSerializer, GroupSerializer, QuestionSerializer
from django.http import JsonResponse


#  curl -H 'Accept: application/json; indent=4' -u shokerkill:soft11appo http://127.0.0.1:8000/questions/2/


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows questions to be viewed or edited.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class QuesionFilteredView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        """
        Filter questions data by some value
        :return:
        """
        text = self.kwargs['text']
        return Question.objects.filter(text=text)


def create_answer(request):
    who = request.POST.get('user', '')
    question = request.POST.get('question', '')
    answer = request.POST.get('answer', '')
    if who and question and answer:
        pass
    return JsonResponse({'status': 'ok', 'details': 'answer saved'})
