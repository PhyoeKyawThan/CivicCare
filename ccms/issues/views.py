from django.shortcuts import render, redirect
from django.http.request import HttpRequest
from .models import IssueType

def index(request: HttpRequest):
    if request.method == "GET":
        return render(request, 'create.html')
    if request.method == "POST":
        name = request.POST.get('type')
        sample_form = request.POST.get('sample_form')
        issue_type = IssueType(name=name, sample_form=sample_form)
        issue_type.save()
        return render(request, 'create.html')