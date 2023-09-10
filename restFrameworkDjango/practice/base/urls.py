
from django.urls import path,include
from .views import userProfile,productView

urlpatterns = [
  path('profile',userProfile),
  path('products',productView),
  path('products/<int:pk>',productView),

]