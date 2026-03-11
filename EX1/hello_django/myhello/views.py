#from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
logger = logging.getLogger('django')
class HelloApiView (APIView):
    def get(self,request):
        my_name=request.GET.get('name', None)
        logger.debug(" ********** myhello_api: " + my_name)
        if my_name:
            retValue={}
            retValue['data']='hello' + my_name
            return Response(retValue,status=status.HTTP_200_OK)
        else:
            return Response(
                {"res": "parameter: name is None"},
                status =status.HTTP_400_BAD_REQUEST
            )
