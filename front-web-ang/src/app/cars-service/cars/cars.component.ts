import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
})
export class CarsComponent {
  cars: any[] = [];
  searchForm = new FormControl('');
  constructor(private carService: CarsService, private router: Router) {}
  p: number = 1; // Current page
  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe({
      next: (value) => {
        this.cars = value;
        console.log(this.cars);
      },
    });
  }

  deleteCar(car: any) {
    const carId = car.id;

    if (carId) {
      this.carService.deleteCar(carId).subscribe({
        next: () => {
          this.cars = this.cars?.filter((c) => c.id !== carId);
        },
        error: (error) => {
          console.error('Error deleting car:', error);
        },
      });
    }
  }

  editCar(car: any) {
    const carId = car.id;
    if (carId) {
      this.router.navigate(['admin/car/edit', carId]);
    }
  }

  showCar(car: any) {
    const carId = car.id;
    if (carId) {
      this.router.navigate(['admin/car/show', carId]);
    }
  }

  searchCars(query: string) {
    if (query) {
      query = query.toLowerCase();
      this.cars = this.cars.filter(
        (car) =>
          car.make.toLowerCase().includes(query) ||
          car.model.toString().includes(query) ||
          car.engineType.toString().includes(query)
      );
    } else {
      this.getCars();
    }
  }
}
