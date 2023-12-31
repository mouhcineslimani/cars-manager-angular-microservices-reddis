package net.micro.orderservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import net.micro.orderservice.model.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

}