from django.urls import path
from apps.engagement.api import views

urlpatterns = [
    path('posts/<slug:slug>/comments/', views.PostCommentListCreateView.as_view(), name='post_comments'),
    path('comments/<int:pk>/', views.CommentDetailView.as_view(), name='comment_detail'),
    path('posts/<slug:slug>/like/', views.ToggleLikeView.as_view(), name='toggle_like'),
    path('posts/<slug:slug>/bookmark/', views.BookmarkListToggleView.as_view(), name='toggle_bookmark'),
    path('bookmarks/', views.BookmarkListToggleView.as_view(), name='user_bookmarks'),
    path('likes/', views.LikedPostsView.as_view(), name='liked_posts'),
    path('bookmarked-posts/', views.BookmarkedPostsView.as_view(), name='bookmarked_posts'),
]
