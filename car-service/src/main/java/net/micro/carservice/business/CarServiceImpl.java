package net.micro.carservice.business;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.micro.carservice.model.CarEntity;
import net.micro.carservice.repo.CarRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class CarServiceImpl implements CarService {

	private CarRepository carRepository;

	@Override
	public Flux<CarEntity> getAllCars() {
		return carRepository.findAll();
	}

	@Override
	public Mono<CarEntity> getCarById(int id) {
		return carRepository.findById(id);
	}

	@Override
	public Mono<CarEntity> saveCar(CarEntity car) {
		return carRepository.save(car);
	}

	@Override
	public Mono<Void> deleteCar(int id) {
		return carRepository.deleteById(id);
	}

	@Override
	public Flux<CarEntity> getCarsByMake(String make) {
		System.out.println("<<<<<" + make);
		return carRepository.findByMake(make);
	}

	@Override
	public Mono<CarEntity> updateCar(int id, CarEntity updatedCar) {
		return carRepository.findById(id)
				.flatMap(existingCar -> {
					// Update the existing car with the new values
					existingCar.setMake(updatedCar.getMake());
					existingCar.setPrice(updatedCar.getPrice());
					existingCar.setYear(updatedCar.getYear());
					existingCar.setModel(updatedCar.getModel());
					existingCar.setEngineType(updatedCar.getEngineType());

					// Save the updated car to the database
					return carRepository.save(existingCar);
				});
	}
}
