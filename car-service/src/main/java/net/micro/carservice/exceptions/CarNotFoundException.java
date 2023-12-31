package net.micro.carservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Car not found")
public class CarNotFoundException extends RuntimeException {
    public CarNotFoundException(String message) {
        super(message);
    }
}
