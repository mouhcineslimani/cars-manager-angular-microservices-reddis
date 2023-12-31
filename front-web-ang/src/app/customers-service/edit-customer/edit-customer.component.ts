import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customers.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
})
export class EditCustomerComponent {
  formGroup: FormGroup;
  customerId: string | undefined;
  showSuccessAlert: boolean = false;
  customers: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.formGroup = this.formBuilder.group({
      email: '',
      phone: '',
      name: '',
      address: '',
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('id')!;
      if (this.customerId !== null) {
        this.fetchCustomerDetails();
      }
    });
  }

  fetchCustomerDetails() {
    this.customerService
      .getCustomerById(this.customerId!)
      .subscribe((customer) => {
        console.log('>>> ' + customer);
        this.formGroup.patchValue(customer);
      });
  }

  handleUpdateCustomer() {
    if (this.formGroup.valid) {
      this.customerService
        .updateCustomer(this.customerId!, this.formGroup.value)
        .subscribe(
          (updatedCar) => {
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
