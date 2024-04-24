"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .authentication.views import register, LoginView
from .courses.views import get_user_courses, delete_course, edit_course, create_course
from .courses.views import get_course_directories, delete_directory, edit_directory, create_directory
from .courses.views import get_file, view_file

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register, name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/courses/', get_user_courses, name='get_user_courses'),
    path('user/courses/delete', delete_course, name='delete_course'),
    path('user/courses/edit', edit_course, name='edit_course'),
    path('user/courses/create', create_course, name='create_course'),
    path('user/courses/course', get_course_directories, name='get_course_directories'),
    path('user/courses/course/delete', delete_directory, name='delete_directory'),
    path('user/courses/course/create', create_directory, name='create_directory'),
    path('user/courses/course/edit', edit_directory, name='edit_directory'),
    path('user/courses/course/file', get_file, name='get_file'),
    path('user/courses/course/view_file', view_file, name='view_file')
]
