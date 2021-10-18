from django.urls import path
from .views import *

urlpatterns = [path('', toolsView, name='tools_view'),
               path('json_tool/', jsonTool, name='json_tool'),
               path('json_form/', formLogin, name='json_form'),
               path('delete/<int:id>', delete, name='delete'),
               path('search/', search, name='search'),
               ]