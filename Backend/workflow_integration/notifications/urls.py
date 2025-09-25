from django.urls import path
from . import views

urlpatterns = [
    path("workflow/start/", views.start_workflow, name="start_workflow"),
]
