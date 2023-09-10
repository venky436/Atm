from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100,null=False,blank=False)
    last_name = models.CharField(max_length=100,null=True,blank=True)
    email = models.CharField(max_length=100,null=False,blank=False)
    bio = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now=True)
    profile_img = models.ImageField(null=True,blank=True)

    def __str__(self):
        return self.first_name


class Customer(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=100,null=False,blank=False)
    email = models.CharField(max_length=100,null=False,blank=False)

    def __str__(self):
        return self.user.first_name

class Product(models.Model):
    name = models.CharField(max_length=100,null=False,blank=False)
    price = models.FloatField(null=False,blank=False)
    description = models.CharField(max_length=1000,null=True,blank=True)
    rating = models.FloatField(null=True,blank=True)
    image = models.ImageField(null=False,blank=False)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.name

class Order(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE)
    completed = models.BooleanField(default=False,null=True)
    transaction_id = models.CharField(max_length=250,null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.transaction_id

class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    quentity = models.IntegerField(default=0,null=True)










