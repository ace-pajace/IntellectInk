from setuptools import setup, find_packages

with open('requirements.txt') as f:
    required_packages = f.read().splitlines()

setup(
    name='Nazwa_Twojej_Paczki',
    version='0.1.0',
    description='Opis Twojej paczki',
    author='Twoje Imię/Nazwa Autora',
    packages=find_packages(),
    install_requires=required_packages,
)
