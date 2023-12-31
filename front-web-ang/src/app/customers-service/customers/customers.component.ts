import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customers.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  customers: any;
  p: number = 1; // Current page
  searchForm = new FormControl('');
  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}
  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (value) => {
        this.customers = value;
        console.log('>>>', this.customers);
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      },
    });
  }

  editCustomer(customer: any) {
    const customerId = customer.id;
    if (customerId) {
      this.router.navigate(['admin/customer/edit', customerId]);
    }
  }

  showCustomer(customer: any) {
    const customerId = customer.id;
    if (customerId) {
      this.router.navigate(['admin/customer/show', customerId]);
    }
  }

  deleteCustomer(c: any) {
    this.customerService.deleteCustomer(c.id).subscribe({
      next: () => {
        this.getCustomers();
      },
      error: (error) => {
        console.error('Error deleting customer:', error);
      },
    });
  }

  searchCustomers(query: string) {
    if (query) {
      query = query.toLowerCase();
      this.customers = this.customers.filter(
        (customer: any) =>
          customer.name.toLowerCase().includes(query) ||
          customer.phone.toString().includes(query) ||
          customer.address.toString().includes(query)
      );
    } else {
      this.getCustomers();
    }
  }
}
