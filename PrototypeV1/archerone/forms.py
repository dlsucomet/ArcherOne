from django import forms
from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
from .models import User

class SignUpForm(UserCreationForm):
    COLLEGES = [
        ('BAGCED', 'BAGCED'),
        ('CCS', 'CCS'),
        ('CLA', 'CLA'),
        ('COL', 'COL'),
        ('COS', 'COS'),
        ('GCOE', 'GCOE'),
        ('RVRCOB', 'RVRCOB'),
        ('SOE', 'SOE'),
        ]

    email = forms.EmailField(label='DLSU email', help_text='Required. Enter a valid DLSU email address.')
    first_name = forms.CharField(label='First name', max_length=100)
    last_name = forms.CharField(label='Last name', max_length=100)
    id_number = forms.CharField(label='ID number', max_length=8)
    college = forms.CharField(label='College', widget=forms.Select(choices=COLLEGES))
    course = forms.CharField(label='Course', max_length=100)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'id_number', 'college', 'course', 'password1', 'password2', )