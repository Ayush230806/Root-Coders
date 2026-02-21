from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from django.utils import timezone
from django.db.models import Sum

from .models import Vehicle, Driver, Trip, Expense
from .serializers import (
    VehicleSerializer,
    DriverSerializer,
    TripSerializer,
    ExpenseSerializer
)


# -------------------------
# BASIC CRUD VIEWSETS
# -------------------------

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# -------------------------
# TRIP LOGIC (ADVANCED)
# -------------------------

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def create(self, request, *args, **kwargs):
        vehicle = Vehicle.objects.get(id=request.data['vehicle'])
        driver = Driver.objects.get(id=request.data['driver'])
        cargo_weight = int(request.data['cargo_weight'])

        # Validations
        if cargo_weight > vehicle.max_capacity:
            return Response({"error": "Cargo exceeds capacity"}, status=400)

        if driver.license_expiry < timezone.now().date():
            return Response({"error": "License expired"}, status=400)

        if vehicle.status != "Available":
            return Response({"error": "Vehicle not available"}, status=400)

        if driver.status != "On Duty":
            return Response({"error": "Driver not on duty"}, status=400)

        trip = Trip.objects.create(
            vehicle=vehicle,
            driver=driver,
            cargo_weight=cargo_weight,
            revenue=request.data.get('revenue', 0),
            start_odometer=request.data.get('start_odometer')
        )

        vehicle.status = "On Trip"
        driver.status = "On Trip"
        vehicle.save()
        driver.save()

        return Response({"message": "Trip dispatched successfully"})


    # @action(detail=True, methods=['post'])
    # def complete(self, request, pk=None):
    #     trip = self.get_object()

    #     trip.status = "Completed"
    #     trip.end_odometer = request.data.get('end_odometer')
    #     trip.save()

    #     trip.vehicle.status = "Available"
    #     trip.driver.status = "On Duty"
    #     trip.vehicle.save()
    #     trip.driver.save()

    #     return Response({"message": "Trip completed successfully"})
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        trip = self.get_object()

        end_odometer = int(request.data.get('end_odometer'))

    # Validate end odometer
        if end_odometer < trip.start_odometer:
            return Response({"error": "End odometer cannot be less than start odometer"}, status=400)

        trip.status = "Completed"
        trip.end_odometer = end_odometer
        trip.save()

    # 🔥 UPDATE VEHICLE ODOMETER HERE
        trip.vehicle.odometer = end_odometer
        trip.vehicle.status = "Available"
        trip.vehicle.save()

    # Update driver status
        trip.driver.status = "On Duty"
        trip.driver.save()

        return Response({"message": "Trip completed successfully and odometer updated"})


# -------------------------
# DASHBOARD API
# -------------------------

class DashboardView(APIView):
    def get(self, request):
        active_fleet = Vehicle.objects.filter(status="On Trip").count()
        in_shop = Vehicle.objects.filter(status="In Shop").count()
        total_vehicles = Vehicle.objects.count()
        pending_trips = Trip.objects.filter(status="Draft").count()

        utilization = (active_fleet / total_vehicles * 100) if total_vehicles else 0

        return Response({
            "active_fleet": active_fleet,
            "in_shop": in_shop,
            "utilization_rate": round(utilization, 2),
            "pending_trips": pending_trips
        })


# -------------------------
# ANALYTICS API
# -------------------------

class AnalyticsView(APIView):
    def get(self, request):
        vehicles = Vehicle.objects.all()
        data = []

        for vehicle in vehicles:
            fuel_expenses = Expense.objects.filter(
                vehicle=vehicle, type="Fuel"
            ).aggregate(total_liters=Sum('liters'), total_fuel_cost=Sum('amount'))

            maintenance_cost = Expense.objects.filter(
                vehicle=vehicle, type="Maintenance"
            ).aggregate(total=Sum('amount'))['total'] or 0

            trips = Trip.objects.filter(vehicle=vehicle, status="Completed")
            total_revenue = trips.aggregate(total=Sum('revenue'))['total'] or 0

            total_distance = sum(
                (trip.end_odometer - trip.start_odometer)
                for trip in trips if trip.end_odometer
            )

            fuel_efficiency = (
                total_distance / fuel_expenses['total_liters']
                if fuel_expenses['total_liters'] else 0
            )

            roi = (
                (total_revenue - (maintenance_cost + (fuel_expenses['total_fuel_cost'] or 0)))
                / vehicle.acquisition_cost
                if vehicle.acquisition_cost else 0
            )

            data.append({
                "vehicle": vehicle.name,
                "fuel_efficiency_km_per_l": round(fuel_efficiency, 2),
                "roi": round(roi, 2)
            })

        return Response(data)