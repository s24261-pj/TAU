package com.example.order_management_system.services;

public interface PaymentService {
    boolean processPayment(String userId, String productId);
}