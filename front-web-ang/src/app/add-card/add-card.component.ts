import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarsService } from '../services/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
})
export class AddCardComponent {
  formGroup: FormGroup;
  showSuccessAlert: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarsService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      make: '',
      price: 0,
      year: '',
      model: '',
      engineType: '',
    });
  }

  handleAddCar() {
    if (this.formGroup.valid) {
      this.carService.addCar(this.formGroup.value).subscribe(
        (newCar) => {
          console.log('Car added successfully:', newCar);
          // this.router.navigate(['/admin/cars']);
          this.showSuccessAlert = true;
          this.resetForm();
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 3000);
        },
        (error) => {
          console.error('Error adding car:', error);
        }
      );
    }
  }

  resetForm() {
    this.formGroup.reset({
      make: '',
      price: 0,
      model: '',
      year: 1900,
      engineType: '',
    });
  }
}
