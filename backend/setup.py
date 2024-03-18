import os
from setuptools import setup, find_packages

os.chdir('./backend/')
requirements_file = os.path.join(os.getcwd(), 'requirements.txt')

with open(requirements_file) as f:
    required_packages = f.read().splitlines()

setup(
    name='Nazwa_Twojej_Paczki',
    version='0.1.0',
    description='Opis Twojej paczki',
    author='Twoje Imię/Nazwa Autora',
    packages=find_packages(),
    install_requires=required_packages,
)
