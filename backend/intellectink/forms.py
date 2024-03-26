from django import forms
from .models import Users

class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Users
        fields = ['email', 'username', 'password', 'title', 'name', 'surname']
        widgets = {
            'title': forms.TextInput(attrs={'required': False})
        }

class LoginForm(forms.Form):
    username = forms.CharField(max_length=255)
    password = forms.CharField(widget=forms.PasswordInput)


    def clean_username(self):
        username = self.cleaned_data.get('username')
        if len(username) > 255:
            raise forms.ValidationError('Username cannot be longer than 255 characters')
        return username

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password) < 8:
            raise forms.ValidationError('Password must be at least 8 characters long.')
        elif len(password) > 255:
            raise forms.ValidationError('Password cannot be longer than 255 characters')
        return password

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name) > 255:
            raise forms.ValidationError('Name cannot be longer than 255 characters')
        return name

    def clean_surname(self):
        surname = self.cleaned_data.get('surname')
        if len(surname) > 255:
            raise forms.ValidationError('Surname cannot be longer than 255 characters')
        return surname

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if len(title) > 255:
            raise forms.ValidationError('Title cannot be longer than 255 characters')
        return title
