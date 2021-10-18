import json
from django import http
from django.db import connections
from django.http.response import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.template import RequestContext
from django.db.models import Q
from django.core.paginator import Paginator
from .models import *

# Create your views here.


def toolsView(request):
    return render(request, 'base.html')


def formLogin(request):
    if request.method == "POST" and request.is_ajax:
        create_tool = Tools.objects.create(tool_name=request.POST['toolName'],
                                           tool_link=request.POST['toolLink'],
                                           tool_description=request.POST['toolDescription'])

        msg = "The operation was successful!"
        valueTag = request.POST['tags'].split(',')
        for val in valueTag:
            create_tag = Tags.objects.create(
                tags=val, Fk=create_tool)

    return HttpResponse(msg)


def jsonTool(request):

    tools = createJson()


    return JsonResponse({"tool": list(tools)})


def delete(request, id):
    tool = get_object_or_404(Tools, pk=id)
    tool.delete()
    return HttpResponse('ok')


def search(request):
    searchToolName = request.GET.get('searchName')
    searchTags = request.GET.get('searchTag')

    if searchToolName.strip() is None or not searchToolName.strip():
        return HttpResponse(None)

    if(searchTags == 'show'):
        tagsVal = Q(tags=searchToolName)
        tool = list()

        tag = Tags.objects.filter(tagsVal).order_by('-id').values()
        if(tag):
            teste = createJson()
            for item in teste:

                for value in item['tags']:
                    if value == searchToolName:
                      
                        tool.append(item)

           

        return JsonResponse({"tool": tool})

    tools = Q(tool_name__icontains=searchToolName)

    tool = Tools.objects.filter(tools).order_by('-id').values()

    tool = getValues(tool)

    return JsonResponse({"tool": list(tool)})


def getValues(tool):

    for toolValue in tool:
        toolValue['tags'] = []
        tags = Tags.objects.filter(Fk__id=toolValue['id']).values()
        for tag in tags:
            if tag['Fk_id'] == toolValue['id']:
                toolValue['tags'].append(tag['tags'])
    return tool


def createJson():
    tools = Tools.objects.all().order_by('-id').values()
    tags = Tags.objects.all().values()

    for tool in tools:
        tool['tags'] = []
        for tag in tags:
            if tag['Fk_id'] == tool['id']:
                tool['tags'].append(tag['tags'])
    return tools
