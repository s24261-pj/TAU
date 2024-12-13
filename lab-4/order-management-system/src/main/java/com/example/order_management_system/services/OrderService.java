package com.example.order_management_system.services;

public class OrderService {
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;

    public OrderService(PaymentService paymentService, InventoryService inventoryService, NotificationService notificationService) {
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
        this.notificationService = notificationService;
    }

    public boolean placeOrder(String userId, String productId) {
        if (!inventoryService.isProductAvailable(productId)) {
            notificationService.sendNotification(userId, "Product is not available");
            return false;
        }

        try {
            if (paymentService.processPayment(userId, productId)) {
                notificationService.sendNotification(userId, "Order placed successfully");
                return true;
            } else {
                notificationService.sendNotification(userId, "Payment failed");
                return false;
            }
        } catch (Exception e) {
            notificationService.sendNotification(userId, "An error occurred during payment processing");
            return false;
        }
    }
}