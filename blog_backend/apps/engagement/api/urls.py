from django.urls import path
from apps.engagement.api import views

urlpatterns = [
    path('posts/<slug:slug>/comments/', views.post_comments, name='post_comments'),
    path('comments/<int:pk>/', views.comment_detail, name='comment_detail'),
    path('posts/<slug:slug>/like/', views.toggle_like, name='toggle_like'),
    path('posts/<slug:slug>/bookmark/', views.bookmark_list_toggle, name='toggle_bookmark'),
    path('bookmarks/', views.bookmark_list_toggle, name='user_bookmarks'),
    path('likes/', views.liked_posts, name='liked_posts'),
    path('bookmarked-posts/', views.bookmarked_posts, name='bookmarked_posts'),
]
