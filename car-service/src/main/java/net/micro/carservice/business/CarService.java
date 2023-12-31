package net.micro.carservice.business;

import net.micro.carservice.model.CarEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CarService {
	Flux<CarEntity> getAllCars();

	Mono<CarEntity> getCarById(int id);

	Mono<CarEntity> saveCar(CarEntity car);

	Mono<Void> deleteCar(int id);

	Flux<CarEntity> getCarsByMake(String make);

	Mono<CarEntity> updateCar(int id, CarEntity updatedCar);

}
