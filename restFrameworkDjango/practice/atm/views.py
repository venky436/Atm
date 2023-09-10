from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import RegisterUserSerializer,AccountSerializer,TransactionSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
import random
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def validateAccountNumber(num):
    users = Account.objects.all()
    for i in users:
        if i.account_number == num:
            return True
            break
    return False

randomNum = 0
def createAccountNumber():
    randomNum = random.randrange(1000000000,1199999999)
    isExist = validateAccountNumber(randomNum) 
    while isExist == True:
        createAccountNumber()
    return randomNum


@api_view(['POST','GET'])
def userRegisterView(request):
    data = request.data
    if request.method == "POST":
        try:
            user = User.objects.get(email = data['email'])
            if user:
                return Response('User Already exisited with given credentials')
        except:
            user = User.objects.create(username = data['username'],email = data['email'],first_name = data['first_name'],last_name = data['last_name'],password = data['password'])
            user.is_staff = True
            user.set_password(data['password'])
            user.save()
            accountNumber = createAccountNumber()
            account = Account.objects.create(user=user,account_number = accountNumber,amount = 0)
            tokens = get_tokens_for_user(user)
            return Response(tokens)


@api_view(['POST'])
def userLoginView(request):
    data = request.data
    if request.method == 'POST':
        user = authenticate(username = data['username'],password = data['password'])
        if user is not None:
            login(request,user)
            tokens = get_tokens_for_user(user)
            return Response(tokens)
        return Response('User Not Found',status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def userLogoutView(request):
    if request.method == 'POST':
        logout(request)
        return Response('Logged Out Successfully')
    


@api_view(['GET'])
def account(request):
    # if request.user.is_authenticated:
    user = request.user
    try:
        account = Account.objects.get(user=user)
        print(account,'opopop')
    # if account is not None:
        seri = AccountSerializer(account,many=False)
        return Response(seri.data)
    except:
        return Response('user not found')
    # else:
    #     return Response('User not authenticated')


@api_view(["POST"])
def deposite_amount(request):
    user = request.user
    data = request.data
    if user.is_authenticated:
        try:
            if user is not None:
                account = Account.objects.get(account_number = data['accountNumber'])
                tran = Transaction.objects.create(account = account,existAmount = account.amount,amount=data['amount'],isCredited = True)
                account.amount+=int(data['amount'])
                account.save()
                return Response({"message":"Deposite Successfull"})
            else:
                return Response({"error":"user is not exist with given email"})
        except:
            return Response('invald account number',status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"message" : "user not authenticated"})

@api_view(["POST"])
def withdrawl_amount(request):
    data = request.data
    user = request.user
    if user.is_authenticated:
        try:
            if user is not None:
                account = Account.objects.get(account_number = data['accountNumber'])
                tran = Transaction.objects.create(account = account,existAmount = account.amount,amount=data['amount'],isCredited = False)
                account.amount-=int(data['amount'])
                account.save()
                return Response({"message":"Withdrawl Successfull"})
            else:
                return Response({"error":"user is not exist with given account number"})
        except:
            return Response('Something wrong')
    else:
        return  Response('User not authenticated',status=status.HTTP_404_NOT_FOUND)

@api_view(["GET","POST"])
def transactions(request):
    data = request.data
    try:
        account = Account.objects.get(account_number = int(data['account_number']))
        if account is not None:
            trasactions = Transaction.objects.filter(account = account)
            seri = TransactionSerializer(trasactions,many=True)
            print(seri.data,'iiiiiiiiii')
            return Response(seri.data)
        else:
            return Response({"error":"account not exist"})
    except:
        return Response('Something wrong')
        





