from django.contrib.auth.models import User, Group
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from question_server.models import Question, Answers
from rest_framework import viewsets, generics
from question_server.serializers import UserSerializer, GroupSerializer, QuestionSerializer
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
