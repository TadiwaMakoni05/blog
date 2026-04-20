from django.urls import path
from apps.notifications.api import views

urlpatterns = [
    path('subscribe/', views.SubscribeNewsletterView.as_view(), name='subscribe_newsletter'),
]
