package net.micro.carservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table("cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarEntity {
	@Id
	private Integer id;
	private String make;
	private double price;
	private int year;
	private String model;
	private String engineType;
}
