from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from ..intellectink.models import CourseAccess, Courses, Users, Directories


# @login_required
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


# @login_required
def delete_course(request):
    """
    Delete specified course.
    :param request:
    Data must contain 'course_id', which is the course to be deleted.
    :return:
    JSON response with status 200 - OK, or 403 - Forbidden if permissions are not enough.
    """
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication needed'}, status=401)
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


# @login_required
def edit_course(request):
    """
    :param request:
    Data must contain 'course_id', which is the id of the course to be updated.
    Data must contain 'name', which is the new name for the course
    Data must contain 'edition', which is the new edition for the course
    :return:
    JSON response with status 200 - OK, or 403 - Forbidden if permissions are not enough.
    """
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication needed'}, status=401)
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
            return JsonResponse({'message': "Course updated"}, status=200)


# @login_required
def create_course(request):
    """
    Creates a new Course. Creates a new CourseAccess, making the user who is creating the course, the creator.
    Creates a new Directory, and sets it as the root directory for the created course.
    :param request:
    Data must contain 'term' and 'edition', and either 'course_id' or 'name'
    :return:
    JSON response: Course created upon successful creation, with status 200 - OK.
    """
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication needed'}, status=401)
    parent_c_id = request.data.get('course_id')
    if parent_c_id is None:
        course = Courses(term=request.data.get('term'), name=request.data.get('name'),
                         edition=request.data.get('edition'))
        course.save()
        course_access = CourseAccess(user=request.user, course=course, access_level=3)
        course_access.save()
        directory = Directory(parent_directory=None, name="root", course=course)
        directory.save()
        return JsonResponse({'message': "Course created"}, status=200)
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


### COURSES DONE ### DIRECTORIES TIME

# @login_required
def get_course_directories(request):
    """
    Get the directories of a specified course.
    :param request:
    Data needs to contain 'course_id'.
    :return:
    JSON response with either: list of dicts containing info about the directories with status 200 - OK
    Or a message with status 403 - Forbidden
    """
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication needed'}, status=401)
    user_email = request.user.email
    course_id = request.data.get('course_id')
    access = CourseAccess.objects.filter(user__email=user_email).filter(course__course_id=course_id)
    if not access:
        return JsonResponse({'message': "Course not found or no access to course"}, status=403)
    if access[0].access_level < 1:
        return JsonResponse({'message': "Access denied"}, status=403)
    directories = Directories.objects.filter(course__course_id=course_id)
    directories_data = [{
        'directory_id': directory.directory_id,
        'name': directory.name,
        'parent_directory': directory.parent_directory,
        'course': directory.course} for directory in directories]

    return JsonResponse({'directories': directories_data}, status=200)


# @login_required
def edit_directory(request):
    """
    Edit a directory.
    :param request:
    Data must contain 'directory_id' and 'name', that is specifying the directory to be edited and its new name.
    :return:
    JSON response with either status 200 - OK or 403 - Forbidden
    """
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication needed'}, status=401)
    user_email = request.user.email
    directory_id = request.data.get('directory_id')
    course = Directories.objects.get(directory_id=directory_id).course
    access = CourseAccess.objects.filter(user__email=user_email).filter(course=course)
    if not access:
        return JsonResponse({'message': "Course not found or no access to course"}, status=403)
    if access[0].access_level < 2:
        return JsonResponse({'message': 'Access denied'}, status=403)

    updating_directory = Directories.objects.get(directory_id=directory_id)
    updating_directory.name = request.data.get('name')
    updating_directory.save()
    return JsonResponse({'message': 'Directory successfully updated'}, status=200)


# @login_required
def delete_directory(request):
    """
    Deletes specified directory.
    :param request:
    Data must contain 'directory_id' --> specifying the id of the directory to be deleted
    :return:
    JSON response with either status 200 - OK or 403 - Forbidden
    """
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication needed'}, status=401)
    user_email = request.user.email
    directory_id = request.data.get('directory_id')
    closed_dir = Directories.objects.get(directory_id=directory_id)
    access = CourseAccess.objects.filter(user__email=user_email).filter(course=closed_dir.course)
    if not access:
        return JsonResponse({'message': "Course not found or no access to course"}, status=403)
    if access[0].access_level < 2:
        return JsonResponse({'message': 'Access denied'}, status=403)

    closed_dir.delete()


# @login_required
def create_directory(request):
    """
    Creates a new directory.
    :param request:
    Data must contain 'directory_id' --> specifying parent directory, and 'name', the name of the newly created directory
    :return:
    JSON response with either status 200 - OK or 403 - Forbidden
    """
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication needed'}, status=401)
    user_email = request.user.email
    course = Directories.objects.get(directory_id=request.data.get('directory_id')).course
    access = CourseAccess.objects.filter(user__email=user_email).filter(course=course)
    if not access:
        return JsonResponse({'message': "Course not found or no access to course"}, status=403)
    if access[0].access_level < 2:
        return JsonResponse({'message': 'Access denied'}, status=403)

    parent_directory = Directories.objects.get(directory_id=request.data.get('directory_id'))
    directory = Directories(parent_directory=parent_directory, course=course, name=request.data.get('name'))
    directory.save()
