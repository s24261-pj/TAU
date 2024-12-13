package com.example.order_management_system.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class OrderServiceTest {
    private OrderService orderService;
    private PaymentService paymentServiceMock;
    private InventoryService inventoryServiceMock;
    private NotificationService notificationServiceMock;

    private final String productId = "123";
    private final String userId = "user1";

    @BeforeEach
    void setUp() {
        paymentServiceMock = mock(PaymentService.class);
        inventoryServiceMock = mock(InventoryService.class);
        notificationServiceMock = mock(NotificationService.class);

        orderService = new OrderService(paymentServiceMock, inventoryServiceMock, notificationServiceMock);
    }

    @Test
    @DisplayName("Order is placed successfully when product is available and payment succeeds")
    void shouldPlaceOrderSuccessfully() {
        when(inventoryServiceMock.isProductAvailable(productId)).thenReturn(true);
        when(paymentServiceMock.processPayment(userId, productId)).thenReturn(true);

        boolean result = orderService.placeOrder(userId, productId);

        assertTrue(result);
        verify(inventoryServiceMock).isProductAvailable(productId);
        verify(paymentServiceMock).processPayment(userId, productId);
        verify(notificationServiceMock).sendNotification(eq(userId), eq("Order placed successfully"));
    }

    @Test
    @DisplayName("Order fails when product is not available")
    void shouldFailToPlaceOrderWhenProductNotAvailable() {
        when(inventoryServiceMock.isProductAvailable(productId)).thenReturn(false);

        boolean result = orderService.placeOrder(userId, productId);

        assertFalse(result);
        verify(inventoryServiceMock).isProductAvailable(productId);
        verifyNoInteractions(paymentServiceMock);
        verify(notificationServiceMock).sendNotification(eq(userId), eq("Product is not available"));
    }

    @Test
    @DisplayName("Order fails when payment is not processed successfully")
    void shouldFailToPlaceOrderWhenPaymentFails() {
        when(inventoryServiceMock.isProductAvailable(productId)).thenReturn(true);
        when(paymentServiceMock.processPayment(userId, productId)).thenReturn(false);

        boolean result = orderService.placeOrder(userId, productId);

        assertFalse(result);
        verify(inventoryServiceMock).isProductAvailable(productId);
        verify(paymentServiceMock).processPayment(userId, productId);
        verify(notificationServiceMock).sendNotification(eq(userId), eq("Payment failed"));
    }

    @Test
    @DisplayName("Order handles exception from PaymentService gracefully")
    void shouldHandleExceptionFromPaymentService() {
        when(inventoryServiceMock.isProductAvailable(productId)).thenReturn(true);
        when(paymentServiceMock.processPayment(userId, productId)).thenThrow(new RuntimeException("Payment service error"));

        boolean result = orderService.placeOrder(userId, productId);

        assertFalse(result);
        verify(inventoryServiceMock).isProductAvailable(productId);
        verify(paymentServiceMock).processPayment(userId, productId);
        verify(notificationServiceMock).sendNotification(eq(userId), eq("An error occurred during payment processing"));
    }
}
