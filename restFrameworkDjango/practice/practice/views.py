from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def test(request):
    data = {
        'name':'venkatesh',
        'age' : '24'
    }
    return Response(data)
    
