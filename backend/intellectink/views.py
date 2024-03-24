from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import CourseAccess


@login_required
def get_user_courses(request):
    user_email = request.user.email

