from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Account,Transaction


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','is_staff']

    

class AccountSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account
        fields = ['user','account_number','amount','created_at']

    def get_user(self,obj):
        user = obj.user 
        seri = RegisterUserSerializer(user,many=False)
        return seri.data

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['existAmount','amount','isCredited','created_at']

 