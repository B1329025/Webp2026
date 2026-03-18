from django.db import models

# Create your models here.

class Post(models.Model):
    department = models.CharField(max_length=100)
    course_title = models.CharField(max_length=100)
    instructor = models.CharField(max_length=100,default='Unknown')
    