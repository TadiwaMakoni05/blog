from django.urls import path
from apps.blog.api import views

urlpatterns = [
    path('categories/', views.category_list, name='category_list'),
    path('tags/', views.tag_list, name='tag_list'),
    path('posts/', views.post_list_create, name='post_list_create'),
    path('posts/<slug:slug>/', views.post_detail, name='post_detail'),
]
