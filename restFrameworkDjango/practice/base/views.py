from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import UserProfileSerializer,CustomerSerializer,OrderSerializer,OrderItemSerializer,ProductSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes
from rest_framework import status
import random
# Create your views here.

# return Response(serializer.data,status=status.HTTP_201_CREATED)
# return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST','PUT','PATCH','DELETE'])
def userProfile(request):
    user = request.user
    profile = UserProfile.objects.get(user = user)
    seri = UserProfileSerializer(profile,many=False)
    return Response(seri.data)

@api_view(['POST','GET','PUT','PATCH','DELETE'])
@parser_classes([JSONParser])
def productView(request,pk=None):
    if request.method == 'GET':
        products = Product.objects.all()
        seri= ProductSerializer(products,many=True)
        return Response(seri.data)
    elif request.method == 'POST':
        seri = ProductSerializer(data=request.data)
        if seri.is_valid():
            seri.save()
            return Response(seri.data)
        return Response(serializer.errors,status = HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        product = Product.objects.get(id = pk)
        product.name = request.data['name']
        product.price = request.data['price']
        product.rating = request.data['rating']
        product.save()
        seri = ProductSerializer(product,many=False)
        return Response(seri.data)
    elif request.method == 'DELETE':
        product = Product.objects.get(id=pk)
        product.delete()
        return Response('Product Deleted Successfully')



