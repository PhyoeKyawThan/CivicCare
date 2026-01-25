from django.shortcuts import render
from django.http.request import HttpRequest
from django.http.response import HttpResponse, JsonResponse, HttpResponseNotAllowed

def login(request: HttpRequest) -> JsonResponse:
    if request.method == 'POST':
        return JsonResponse({
            'status': True,
            'message': "Hello From request",  
        })
    return HttpResponseNotAllowed()

