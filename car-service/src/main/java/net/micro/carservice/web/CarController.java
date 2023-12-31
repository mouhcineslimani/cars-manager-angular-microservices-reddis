package net.micro.carservice.web;

import lombok.AllArgsConstructor;
import net.micro.carservice.business.CarService;
import net.micro.carservice.exceptions.CarNotFoundException;
import net.micro.carservice.model.CarEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/cars")
public class CarController {

	private final CarService carService;

	@GetMapping
	public Flux<CarEntity> getAllCars() {
		return carService.getAllCars();
	}

	@PostMapping
	public Mono<ResponseEntity<CarEntity>> saveCar(@RequestBody CarEntity car) {
		return carService.saveCar(car)
				.map(savedCar -> ResponseEntity.status(HttpStatus.CREATED).body(savedCar))
				.defaultIfEmpty(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
	}

	@GetMapping("/{id}")
	public Mono<ResponseEntity<CarEntity>> getCarById(@PathVariable int id) {
		return carService.getCarById(id)
				.map(ResponseEntity::ok)
				.switchIfEmpty(Mono.error(new CarNotFoundException("Car not found with id: " + id)));
	}

	@DeleteMapping("/{id}")
	public Mono<ResponseEntity<Void>> deleteCar(@PathVariable int id) {
		return carService.deleteCar(id)
				.then(Mono.just(ResponseEntity.noContent().<Void>build()))
				.onErrorResume(ex -> Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()));
	}

	@GetMapping("/make/{make}")
	public Flux<CarEntity> getCarsByMake(@PathVariable String make) {
		System.out.println(">>>> " + make);
		return carService.getCarsByMake(make);
	}

	@PutMapping("/{id}")
	public Mono<ResponseEntity<CarEntity>> updateCar(@PathVariable int id, @RequestBody CarEntity updatedCar) {
		return carService.updateCar(id, updatedCar)
				.map(ResponseEntity::ok)
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
}
