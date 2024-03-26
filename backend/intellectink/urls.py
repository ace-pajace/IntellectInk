from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.custom_register, name='register'),
    path('login/', views.custom_login, name='login'),
    path('home/', views.home, name='home')
]
