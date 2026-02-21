from rest_framework import serializers
from .models import Vehicle, Driver, Trip, Expense


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'


class DriverSerializer(serializers.ModelSerializer):
    license_expiry = serializers.DateField(
        input_formats=['%d-%m-%Y', '%Y-%m-%d'],   # 👈 Accept DD-MM-YYYY input
        format='%d-%m-%Y'            # 👈 Return date in DD-MM-YYYY
    )

    class Meta:
        model = Driver
        fields = '__all__'


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'