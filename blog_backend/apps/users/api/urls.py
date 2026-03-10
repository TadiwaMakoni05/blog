from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from apps.users.api import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/me/', views.current_user_profile, name='current_user_profile'),
    path('profile/<str:username>/', views.user_profile_detail, name='user_profile_detail'),
]
