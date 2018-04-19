from django.contrib.auth.models import User, Group
from question_server.models import Question
from rest_framework import viewsets, generics
from question_server.serializers import UserSerializer, GroupSerializer, QuestionSerializer


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
