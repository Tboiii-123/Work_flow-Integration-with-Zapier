from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .utils.workflow import trigger_Zapier_workflow
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def start_workflow(request):
    
    if request.method == "POST":

        try:
            #Parse Json body from postman
            payload = json.loads(request.body.decode("utf-8"))
            result = trigger_Zapier_workflow(payload)

            
            return JsonResponse(result,status=200 if result.get("success") else 500)

        except json.JSONDecodeError:
    
            return JsonResponse({"success": False, "error": "Invalid JSON"}, status=400)
    

    
    return JsonResponse({"success": False, "error": "Only POST allowed"}, status=405)


