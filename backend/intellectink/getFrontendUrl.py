import os

def get_frontend_file_path(file):
    intellectink_dir = os.path.dirname(os.path.dirname(__file__))
    html_path = os.path.join(intellectink_dir, '..', 'frontend', 'public', file)
    return os.path.abspath(html_path)
