from . import api_views
from django.urls import path

urlpatterns = [
    path('get/types', api_views.IssueTypesAPI.as_view(), name="issues-type-get-all-api")    
]