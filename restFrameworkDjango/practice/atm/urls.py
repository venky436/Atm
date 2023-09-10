
from django.urls import path,include
from .views import *

urlpatterns = [
 path('register',userRegisterView),
 path('login',userLoginView),
 path('logout',userLogoutView),
 path('account',account),
 path('deposite',deposite_amount),
 path('withdrawl',withdrawl_amount),
 path('transactions',transactions),
]