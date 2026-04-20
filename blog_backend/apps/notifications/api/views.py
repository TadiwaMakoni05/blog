from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from apps.notifications.api.serializers import NewsletterSerializer

class SubscribeNewsletterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = NewsletterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Subscribed successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
