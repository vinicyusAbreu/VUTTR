from django.contrib import admin
from .models import Tools, Tags

# Register your models here.


class ToolAdmin(admin.ModelAdmin):
    list_display = ('id', 'tool_name')


class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'tags','Fk')


admin.site.register(Tools, ToolAdmin)
admin.site.register(Tags, TagAdmin)
