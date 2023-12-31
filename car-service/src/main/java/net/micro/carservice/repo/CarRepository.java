package net.micro.carservice.repo;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import net.micro.carservice.model.CarEntity;
import reactor.core.publisher.Flux;

public interface CarRepository extends R2dbcRepository<CarEntity, Integer> {
	Flux<CarEntity> findByMake(String make);
}
