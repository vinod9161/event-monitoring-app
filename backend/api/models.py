from django.db import models

class EventLog(models.Model):
    eventType = models.CharField(max_length=100)
    serviceName = models.CharField(max_length=100)
    payload = models.JSONField()
    level = models.CharField(max_length=10)
    timestamp = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f"{self.eventType} - {self.timestamp}"

class Alert(models.Model):
    ruleName = models.CharField(max_length=100)
    eventType = models.CharField(max_length=100)
    serviceName = models.CharField(max_length=100)
    threshold = models.IntegerField()
    count = models.IntegerField()
    timestamp = models.DateTimeField()
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f"{self.ruleName} - {self.serviceName}"
