from django.urls import path
from .views import log_event_view, logs_list_view, alerts_list_view, log_public_event_view

urlpatterns = [
    path('log-event/', log_event_view, name='log-event'),
    path('logs/', logs_list_view, name='logs'),
    path('alerts/', alerts_list_view, name='alerts'),
    path('log-event-public/', log_public_event_view),
]
