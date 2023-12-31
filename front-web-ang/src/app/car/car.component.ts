import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
})
export class CarComponent {
  cars: any[] = [];
  p: number = 1; // Current page
  constructor(private carService: CarsService, private router: Router) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe({
      next: (value) => {
        this.cars = value;
      },
    });
  }

  showCar(car: any) {
    const carId = car.id;
    if (carId) {
      this.router.navigate(['car/show', carId]);
    }
  }
}
