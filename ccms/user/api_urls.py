from django.urls import path
from . import api_views

urlpatterns = [
    path('login', api_views.LoginAPI.as_view(), name="user-login-api"),
    path('signup', api_views.SignupAPI.as_view(), name="user-signup-api"),
]