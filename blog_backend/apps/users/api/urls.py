from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from apps.users.api import views

urlpatterns = [
    path('register/', views.RegisterUserView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/me/', views.CurrentUserProfileView.as_view(), name='current_user_profile'),
    path('profile/<str:username>/', views.UserProfileDetailView.as_view(), name='user_profile_detail'),
]
