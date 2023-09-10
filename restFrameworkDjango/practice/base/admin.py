from django.contrib import admin
from .models import UserProfile,Product,Order,OrderItem,Customer
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)

