from django.db import models
from django.core import serializers
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ForeignKey

# Create your models here.


class Tools(models.Model):
    tool_name = models.CharField(max_length=255, verbose_name='Tool Name')
    tool_link = models.URLField(verbose_name='Tool Link')
    tool_description = models.TextField(verbose_name='Tool Description')

    def __str__(self) -> str:
        return self.tool_name


class Tags(models.Model):
    tags = models.CharField(max_length=255, verbose_name='Tag')
    Fk = models.ForeignKey(Tools, on_delete=CASCADE)

    def __str__(self) -> str:
        return self.tags