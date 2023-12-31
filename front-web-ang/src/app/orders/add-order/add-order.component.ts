import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars.service';
import { CustomerService } from 'src/app/services/customers.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
})
export class AddOrderComponent {
  formGroup!: FormGroup;
  showSuccessAlert: boolean = false;
  cars: any[] = [];
  customers: any;
  customer: any;
  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private customersService: CustomerService,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.getCars();
    this.getCustomers();
    this.formGroup = this.fb.group({
      customerId: this.fb.control(''),
      carId: this.fb.control(''),
      orderDate: this.fb.control(''),
    });
  }

  getCars() {
    this.carsService.getCars().subscribe({
      next: (value) => {
        this.cars = value;
      },
    });
  }

  getCustomers() {
    this.customersService.getCustomers().subscribe({
      next: (value) => {
        this.customers = value;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      },
    });
  }

  handleAddOrder() {
    let newOrder = this.formGroup.value;
    if (this.formGroup.valid) {
      this.ordersService
        .saveOrder(newOrder.customerId, newOrder.carId, newOrder.orderDate)
        .subscribe(
          (newOrder) => {
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

  // getCustomerFromId(id: any) {
  //   console.log('id :' + id);
  //   return this.customers.filter((customer: any) => customer.id == id);
  // }

  resetForm() {
    this.formGroup.reset({
      customerId: '',
      carId: '',
      orderDate: '',
    });
  }
}
