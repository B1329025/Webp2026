from django.http import HttpResponse 
# Create your views here.
def myIndex(request):
    my_name =request.GET.get('name', "CGU")
    return HttpResponse("hello "+ my_name)
