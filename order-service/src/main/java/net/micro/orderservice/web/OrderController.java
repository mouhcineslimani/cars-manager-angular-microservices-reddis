package net.micro.orderservice.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import net.micro.orderservice.model.OrderEntity;
import net.micro.orderservice.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

	private final OrderService orderService;

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<OrderEntity> getOrderById(@PathVariable Long id) {
		return orderService.getOrderById(id).map(order -> new ResponseEntity<>(order, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@GetMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<OrderEntity>> getAllOrders() {
		List<OrderEntity> orders = orderService.getAllOrders();
		System.out.println(">>> " + orders.size());
		return new ResponseEntity<>(orders, HttpStatus.OK);
	}

	@PostMapping("/{customerId}/{carId}/{orderDate}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<OrderEntity> createOrder(@PathVariable String customerId, @PathVariable Integer carId,
			@PathVariable String orderDate) {
		OrderEntity order = OrderEntity.builder().customerId(Integer.parseInt(customerId)).carId(carId)
				.orderDate(orderDate).build();
		System.out.println(">>>"+order);
		OrderEntity createdOrder = orderService.saveOrder(order);
		return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);

	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
		orderService.deleteOrder(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
