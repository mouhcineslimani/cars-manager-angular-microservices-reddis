import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
})
export class EditCardComponent implements OnInit {
  formGroup: FormGroup;
  carId: number | undefined;
  showSuccessAlert: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private carService: CarsService
  ) {
    this.formGroup = this.formBuilder.group({
      make: '',
      price: 0,
      year: 1900,
      model: '',
      engineType: '',
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.carId = +params.get('id')!;
      if (this.carId !== null) {
        this.fetchCarDetails();
      }
    });
  }

  fetchCarDetails() {
    // Fetch car details by ID and populate the form
    this.carService.getCarById(this.carId!).subscribe((car) => {
      this.formGroup.patchValue(car);
    });
  }

  handleUpdateCar() {
    if (this.formGroup.valid) {
      // Perform update operation using this.formGroup.value
      this.carService.updateCar(this.carId!, this.formGroup.value).subscribe(
        (updatedCar) => {
          this.formGroup.patchValue(updatedCar);
          this.showSuccessAlert = true;

          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 3000);
        },
        (error) => {
          console.error('Error updating car:', error);
        }
      );
    }
  }
}
