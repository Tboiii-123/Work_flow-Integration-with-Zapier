
#Calling the n8n webhook to trigger workflows
import requests
#Accessing the evenvironment settings,webhook urls 
from django.conf import settings



import logging

#It gives the logger a name corresponding to the module name
logger = logging.getLogger(__name__)

environment ="production"

def trigger_Zapier_workflow(payload: dict):

    """
    Sends payload to Zapier workflow webhook.
    """
    

    if environment =="production":
        workflow_url ="https://hooks.zapier.com/hooks/catch/24626602/umrrhxd/"

    else:
        workflow_url ="https://httpbin.org/post"
        
        

    


    try:
        
        headers = {
    "Content-Type": "application/json",
    
        }

        response = requests.post(workflow_url, json=payload,headers=headers, timeout=10)

        #Raise an error if teh status code is not 200 thats successfull or Ok

        response.raise_for_status()
        return {"success": True, "data": response.json()}
    except requests.RequestException as e:
        logger.error(f"Zapier workflow failed: {e}")
        return {"success": False, "error": str(e)}

