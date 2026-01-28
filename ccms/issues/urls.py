from django.urls import include, path
from . import views

urlpatterns = [
    path('type/create', views.index, name="issue.type.create")
]