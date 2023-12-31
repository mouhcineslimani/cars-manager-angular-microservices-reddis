import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customers.service';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
})
export class ShowCustomerComponent {
  customer: any;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const customerId = params.get('id')!;
      if (customerId) {
        this.customerService
          .getCustomerById(customerId)
          .subscribe((customer) => {
            this.customer = customer;
          });
      } else {
        console.log('sksf');
      }
    });
  }
}
