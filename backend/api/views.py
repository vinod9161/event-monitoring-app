from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from .models import EventLog, Alert
from .serializers import EventLogSerializer, AlertSerializer
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def log_public_event_view(request):
    serializer = EventLogSerializer(data=request.data)
    if serializer.is_valid():
        event = serializer.save()
        check_alert(event)  # Same logic as your main log view
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def log_event_view(request):
    serializer = EventLogSerializer(data=request.data)
    if serializer.is_valid():
        event = serializer.save()
        check_alert(event)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def check_alert(event):
    if event.eventType == "LOGIN_FAILED":
        window_start = event.timestamp - timedelta(minutes=5)
        recent = EventLog.objects.filter(
            eventType="LOGIN_FAILED",
            serviceName=event.serviceName,
            timestamp__gte=window_start,
        )
        if recent.count() > 3:
            Alert.objects.create(
                ruleName="Login Failures",
                eventType="LOGIN_FAILED",
                serviceName=event.serviceName,
                threshold=3,
                count=recent.count(),
                timestamp=timezone.now(),
                status="active",
            )

# GET /api/logs/
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logs_list_view(request):
    logs = EventLog.objects.order_by('-timestamp')[:20]
    serializer = EventLogSerializer(logs, many=True)
    return Response(serializer.data)

# GET /api/alerts/
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def alerts_list_view(request):
    alerts = Alert.objects.all()
    event_type = request.query_params.get('eventType')
    service_name = request.query_params.get('serviceName')
    status_param = request.query_params.get('status')

    if event_type:
        alerts = alerts.filter(eventType=event_type)
    if service_name:
        alerts = alerts.filter(serviceName=service_name)
    if status_param:
        alerts = alerts.filter(status=status_param)

    serializer = AlertSerializer(alerts, many=True)
    return Response(serializer.data)
