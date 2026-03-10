from django.contrib import admin
from apps.engagement.models import Comment, Like, Bookmark

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'is_approved', 'is_flagged', 'created_at')
    list_filter = ('is_approved', 'is_flagged', 'created_at')
    search_fields = ('content', 'author__username', 'post__title')
    actions = ['approve_comments', 'flag_comments']

    def approve_comments(self, request, queryset):
        queryset.update(is_approved=True)

    def flag_comments(self, request, queryset):
        queryset.update(is_flagged=True)

admin.site.register(Like)
admin.site.register(Bookmark)
