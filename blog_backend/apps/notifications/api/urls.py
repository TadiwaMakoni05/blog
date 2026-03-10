from django.urls import path
from apps.notifications.api import views

urlpatterns = [
    path('subscribe/', views.subscribe_newsletter, name='subscribe_newsletter'),
]
