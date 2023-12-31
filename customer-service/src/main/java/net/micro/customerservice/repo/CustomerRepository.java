package net.micro.customerservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import net.micro.customerservice.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
