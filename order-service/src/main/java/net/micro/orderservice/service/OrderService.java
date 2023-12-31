package net.micro.orderservice.service;

import java.util.List;
import java.util.Optional;

import net.micro.orderservice.model.OrderEntity;

public interface OrderService {
	List<OrderEntity> getAllOrders();

	Optional<OrderEntity> getOrderById(Long id);

	OrderEntity saveOrder(OrderEntity order);

	void deleteOrder(Long id);

}
