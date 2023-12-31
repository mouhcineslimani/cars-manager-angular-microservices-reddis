import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, forkJoin } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { CustomerService } from 'src/app/services/customers.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  orders: any[] = [];
  cars: any[] = [];
  customers: any[] = [];
  customersWithOrders: any[] = [];
  customersWithOrdersItem: any;
  p: number = 1; // Current page
  searchForm = new FormControl('');
  constructor(
    private ordersService: OrdersService,
    private customersService: CustomerService,
    private carService: CarsService
  ) {}

  ngOnInit() {
    forkJoin([this.getOrders(), this.getCars(), this.getCustomers()]).subscribe(
      ([orders, cars, customers]) => {
        this.getCustomersWithOrders(customers, orders, cars);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getCars() {
    return this.carService.getCars().pipe(
      catchError((error) => {
        console.error('Error fetching cars:', error);
        return [];
      })
    );
  }

  getCustomers() {
    return this.customersService.getCustomers().pipe(
      catchError((error) => {
        console.error('Error fetching customers:', error);
        return [];
      })
    );
  }

  getOrders() {
    return this.ordersService.getAllOrders().pipe(
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return [];
      })
    );
  }

  deleteOrder(order: any) {
    const orderId = order.id;

    if (orderId) {
      this.ordersService.deleteOrder(orderId).subscribe({
        next: () => {
          this.getCustomersWithOrders(this.customers, this.orders, this.cars);
        },
        error: (error) => {
          console.error('Error deleting order:', error);
        },
      });
    }
  }

  showOrder(customerId: any) {
    this.customersWithOrdersItem = this.customersWithOrders.filter(
      (item) => item.customerId == customerId
    );
  }

  // getCustomersWithOrders(customers: any, orders: any, cars: any) {
  //   for (let customer of customers) {
  //     let customerOrders = orders.filter(
  //       (order: any) => order.customerId === customer.id
  //     );

  //     if (customerOrders.length > 0) {
  //       let customerWithOrders: any = {
  //         customerId: customer.id,
  //         customerName: customer.name,
  //         customerPhone: customer.phone,
  //         orders: [],
  //       };

  //       for (let order of customerOrders) {
  //         let car = cars.find((c: any) => c.id === order.carId);

  //         customerWithOrders.orders.push({
  //           orderId: order.id,
  //           carMake: car.make,
  //           carModel: car.model,
  //           carPrice: car.price,
  //         });
  //       }

  //       this.customersWithOrders.push(customerWithOrders);
  //     }
  //   }
  // }
  getCustomersWithOrders(customers: any, orders: any, cars: any) {
    for (let customer of customers) {
      let customerOrders = orders.filter(
        (order: any) => order.customerId === customer.id
      );

      if (customerOrders.length > 0) {
        let customerWithOrders: any = {
          customerId: customer.id,
          customerName: customer.name,
          customerPhone: customer.phone,
          totalOrderPrice: 0, // Initialize total order price
          orders: [],
        };

        for (let order of customerOrders) {
          let car = cars.find((c: any) => c.id === order.carId);

          let orderPrice = car.price;

          customerWithOrders.totalOrderPrice += orderPrice;

          customerWithOrders.orders.push({
            orderId: order.id,
            carMake: car.make,
            carModel: car.model,
            carPrice: orderPrice, // Store the individual order price
          });
        }

        this.customersWithOrders.push(customerWithOrders);
      }
    }
  }
}
