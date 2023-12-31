package net.micro.customerservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import net.micro.customerservice.model.Customer;
import net.micro.customerservice.repo.CustomerRepository;

@SpringBootApplication
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepository) {
        return args -> {
            for (int i = 0; i < 5; i++) {
                customerRepository.save(Customer.builder()
                        .name("Customer" + i).email("cust" + i + "@gmail.com")
                        .phone("061232123" + i)
                        .address("Rachidia" + i)
                        .build());
            }
        };
    }
}
