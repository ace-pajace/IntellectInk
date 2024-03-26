from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from ..intellectink.models import CourseAccess, Courses, Users, Directories


@login_required
def get_user_courses(request):
    user_email = request.user.email
    user_courses = CourseAccess.objects.filter(user__email=user_email).select_related('course')

    courses_data = [{
        'name': access.course.name,
        'term': access.course.term,
        'edition': access.course.edition,
        'access_level': access.access_level
    } for access in user_courses]

    return JsonResponse({'courses': courses_data})


@login_required
def delete_course(request):
    user_email = request.user.email
    course_todelete = request.data.get('course_id')
    access = CourseAccess.objects.filter(user__email=user_email).filter(course__course_id=course_todelete)
    if not access:
        return JsonResponse({'message': "Course not found or no access to course"}, status=403)
    else:
        if access[0].access_level != 2 and access[0].access_level != 3:
            return JsonResponse({'message': "Access denied"}, status=403)
        else:
            access[0].delete()
            return JsonResponse({'message': "Access granted. Course deleted"}, status=200)

@login_required
def edit_course(request):
    """
    :param request:
    Data must contain 'course_id', which is the id of the course to be deleted.
    :return:
    """
    user_email = request.user.email
    course_toupdate = request.data.get('course_id')
    access = CourseAccess.objects.filter(user__email=user_email).filter(course__course_id=course_toupdate)
    if not access:
        return JsonResponse({'message': "Course not found or no access to course"}, status=403)
    else:
        if access[0].access_level != 2 and access[0].access_level != 3:
            return JsonResponse({'message': "Access denied"}, status=403)
        else:
            updating_course = Courses.objects.get(course_id=course_toupdate['id'])
            updating_course.name = course_toupdate['name']
            updating_course.edition = course_toupdate['edition']
            return JSONResponse({'message': "Course updated"}, status=200)

@login_required
def create_course(request):
    """
    Creates a new Course. Creates a new CourseAccess, making the user who is creating the course, the creator.
    Creates a new Directory, and sets it as the root directory for the created course.
    :param request:
    Data must contain 'term' and 'edition', and either 'course_id' or 'name'
    :return:
    JSON response: Course created upon successful creation, with status 200 - OK.
    """
    user_email = request.user.email
    parent_c_id = request.data.get('course_id')
    if parent_c_id is None:
        course = Courses(term=request.data.get('term'), name=request.data.get('name'), edition=request.data.get('edition'))
        course.save()
        course_access = CourseAccess(user=request.user, course=course, access_level=3)
        course_access.save()
        directory = Directory(parent_directory=None, name="root", course=course)
        directory.save()
        return JSONResponse({'message': "Course created"}, status=200)
        # You create the course from scratch
    else:
        p_course = Courses.objects.get(course_id=parent_c_id)
        name = p_course.name
        course = Courses(term=request.data.get('term'), name=name, edition=request.data.get('edition'))
        course_access = CourseAccess(user=request.user, course=course, access_level=3)
        course_access.save()
        directory = Directory(parent_directory=None, name="root", course=course)
        directory.save()
        return JsonResponse({'message': "Course created"}, status=200)
        # Get the name from an existing course


