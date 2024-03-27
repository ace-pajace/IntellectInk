from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from ..intellectink.models import CourseAccess, Courses, Users


@login_required
def get_user_courses(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication needed'}, status=401)

    user_email = request.user.email
    user_courses = CourseAccess.objects.filter(user__email=user_email).select_related('course')

    courses_data = [{
        'name': access.course.name,
        'term': access.course.term,
        'edition': access.course.edition,
        'access_level': access.access_level
    } for access in user_courses]

    return JsonResponse({'courses': courses_data})