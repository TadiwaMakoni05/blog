from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.blog.api import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet, basename='post')

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category_list'),
    path('tags/', views.TagListView.as_view(), name='tag_list'),
    path('', include(router.urls)),
]
