import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
})
export class CarInfoComponent implements OnInit {
  car: any;
  constructor(private route: ActivatedRoute, private carService: CarsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const carId = +params.get('id')!;
      if (carId) {
        this.carService.getCarById(carId).subscribe((car) => {
          this.car = car;
        });
      } else {
        console.log('sksf');
      }
    });
  }
}
