import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from './../services/customers.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
})
export class NewCustomerComponent implements OnInit {
  formGroup!: FormGroup;
  showSuccessAlert: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {}
  ngOnInit() {
    this.formGroup = this.fb.group({
      name: this.fb.control(''),
      email: this.fb.control(''),
      phone: this.fb.control(''),
      address: this.fb.control(''),
    });
  }

  handleAddCustomer() {
    let newCustomer = this.formGroup.value;
    if (this.formGroup.valid) {
      this.customerService.addCustomer(newCustomer).subscribe(
        (newCustomer) => {
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
      email: '',
      phone: '',
      name: '',
      address: '',
    });
  }
}
