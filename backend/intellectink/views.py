import hashlib

from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .models import Users
from .forms import RegistrationForm
from .forms import LoginForm
from .getFrontendUrl import get_frontend_file_path
from django.contrib.auth import logout

def home(request):
    return render(request, 'home.html')

def custom_logout(request):
    logout(request)
    return redirect('index')

def custom_register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            title = form.cleaned_data.get('title')
            name = form.cleaned_data.get('name')
            surname = form.cleaned_data.get('surname')

            new_user = Users.objects.create(
                email=email,
                username=username,
                password=hashlib.sha256(password.encode('utf-8')).hexdigest(),
                title=title,
                name=name,
                surname=surname
            )


            return redirect('home')
    else:
        form = RegistrationForm()
    return render(request, get_frontend_file_path('register.html'), {'form': form})

def custom_authenticate( email=None, password=None):
    try:
        user = Users.objects.get(email=email)
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        if user.password == hashed_password:
            return user
    except Users.DoesNotExist:
        return None
def custom_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = custom_authenticate( email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Niepoprawne dane logowania.')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def index(request):
    index_html_path = get_frontend_file_path('index.html')
    return render(request, index_html_path)
