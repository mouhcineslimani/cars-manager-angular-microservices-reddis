package net.micro.customerservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import net.micro.customerservice.model.Customer;

public interface CustomerService {
    List<Customer> getAllCustomers();

    Optional<Customer> getCustomerById(int id);

    Customer saveCustomer(Customer customer);

    void deleteCustomer(int id);

    ResponseEntity<Customer> updateCustomer(int id, Customer updatedCustomer);

}
