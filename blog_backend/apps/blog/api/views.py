from rest_framework import status, generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from django.db.models import Q

from apps.blog.models import Category, Tag, Post
from apps.blog.api.serializers import CategorySerializer, TagSerializer, PostSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [AllowAny]


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        if self.action == 'list':
            queryset = Post.objects.filter(status='Published')
            
            # Filtering
            category = self.request.query_params.get('category')
            tag = self.request.query_params.get('tag')
            author = self.request.query_params.get('author')
            search = self.request.query_params.get('search')
            
            if category:
                queryset = queryset.filter(category__slug=category)
            if tag:
                queryset = queryset.filter(tags__slug=tag)
            if author:
                queryset = queryset.filter(author__username=author)
            if search:
                queryset = queryset.filter(
                    Q(title__icontains=search) | 
                    Q(content__icontains=search) | 
                    Q(excerpt__icontains=search)
                )
            return queryset
        return Post.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = PostSerializer(result_page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):
        # Create Post
        serializer = PostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        post = self.get_object()
        
        # Increment View count on successful retrieve
        if post.status == 'Published' or request.user == post.author:
            post.view_count += 1
            post.save(update_fields=['view_count'])
            serializer = PostSerializer(post, context={'request': request})
            return Response(serializer.data)
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user and not request.user.is_staff:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        
        # In original, PUT implies partial update
        serializer = PostSerializer(post, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user and not request.user.is_staff:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
