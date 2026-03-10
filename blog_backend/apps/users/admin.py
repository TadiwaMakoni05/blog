from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from apps.users.models import CustomUser, Profile

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('email', 'username')
    ordering = ('-date_joined',)
    
admin.site.register(CustomUser, CustomUserAdmin)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'website', 'created_at')
    search_fields = ('user__username', 'user__email')
