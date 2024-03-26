from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .models import Users
from .forms import RegistrationForm
from .forms import LoginForm
from .getFrontendUrl import get_frontend_file_path

def register(request):
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
                password=make_password(password),
                title=title,
                name=name,
                surname=surname
            )


            return redirect('home')
    else:
        form = RegistrationForm()
    return render(request, 'registration/register.html', {'form': form}) #w tej linijce wstawic plik html z rejestracja

def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Invalid username or password.')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form}) #w tej linijce wstawic plik html z logowaniem

def index(request):
    index_html_path = get_frontend_file_path('index.html')
    return render(request, index_html_path)
