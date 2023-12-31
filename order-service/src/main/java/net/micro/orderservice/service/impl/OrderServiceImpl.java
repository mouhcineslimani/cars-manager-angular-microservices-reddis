package net.micro.orderservice.service.impl;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.micro.orderservice.model.OrderEntity;
import net.micro.orderservice.repo.OrderRepository;
import net.micro.orderservice.service.OrderService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
	private final OrderRepository orderRepository;

	@Override
	public List<OrderEntity> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public Optional<OrderEntity> getOrderById(Long id) {
		return orderRepository.findById(id);
	}

	@Override
	public OrderEntity saveOrder(OrderEntity order) {
		System.out.println(">>> " + order);
		return orderRepository.save(order);
	}

	@Override
	public void deleteOrder(Long id) {
		orderRepository.deleteById(id);
	}

}
