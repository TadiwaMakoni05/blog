from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.blog.models import Post
from apps.engagement.models import Comment, Like, Bookmark
from apps.engagement.api.serializers import CommentSerializer, LikeSerializer, BookmarkSerializer
from apps.blog.api.serializers import PostSerializer

class PostCommentListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, slug):
        post = get_object_or_404(Post, slug=slug)
        # Get only top-level comments; replies are nested via serializer
        comments = Comment.objects.filter(post=post, parent__isnull=True, is_approved=True)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
        
    def post(self, request, slug):
        post = get_object_or_404(Post, slug=slug)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        comment = get_object_or_404(Comment, pk=pk)
        if comment.author != request.user and not request.user.is_staff:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        post = get_object_or_404(Post, slug=slug)
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        
        if not created:
            like.delete()
            return Response({"detail": "Unliked post."}, status=status.HTTP_200_OK)
        
        return Response({"detail": "Liked post."}, status=status.HTTP_201_CREATED)

class BookmarkListToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None):
        bookmarks = Bookmark.objects.filter(user=request.user)
        # Typically we might want to return the actual posts in bookmarks
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)

    def post(self, request, slug=None):
        if not slug:
            return Response({"detail": "Post slug required."}, status=status.HTTP_400_BAD_REQUEST)
            
        post = get_object_or_404(Post, slug=slug)
        bookmark, created = Bookmark.objects.get_or_create(user=request.user, post=post)
        
        if not created:
            bookmark.delete()
            return Response({"detail": "Bookmark removed."}, status=status.HTTP_200_OK)
        
        return Response({"detail": "Bookmark added."}, status=status.HTTP_201_CREATED)

class LikedPostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        likes = Like.objects.filter(user=request.user).select_related('post')
        posts = [like.post for like in likes]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)

class BookmarkedPostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookmarks = Bookmark.objects.filter(user=request.user).select_related('post')
        posts = [bookmark.post for bookmark in bookmarks]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)
