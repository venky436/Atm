from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Account(models.Model):
    user = models.OneToOneField(User,on_delete = models.CASCADE)
    account_number = models.BigIntegerField(null = False,blank=False)
    amount = models.FloatField(default = 0,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.user.id)

    # @property
    # def deposite_(self,value):
    #     self.amount += int(value)
    #     # self.save()

class Transaction(models.Model):
    account = models.ForeignKey(Account,on_delete = models.CASCADE)
    existAmount = models.FloatField(default = 0,null=True,blank=True)
    amount = models.FloatField(default = 0,null=True,blank=True)
    isCredited = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.account.account_number)

        




