import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface CustomerWithOrders {
  customerId: number;
  customerName: string;
  customerPhone: string;
  orders: {
    orderId: number;
    carMake: string;
    carModel: string;
    carPrice: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:8888/order-service/orders';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrderById(orderId: number): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.get(url);
  }

  saveOrder(
    customerId: string,
    carId: number,
    orderDate: string
  ): Observable<any> {
    const url = `${this.apiUrl}/${customerId}/${carId}/${orderDate}`;
    return this.http.post(url, {});
  }

  deleteOrder(orderId: number): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete(url);
  }

  getOrdersByCustomerId(customerId: string): Observable<any[]> {
    const url = `${this.apiUrl}/customer/${customerId}`;
    return this.http.get<any[]>(url);
  }

  getCustomersWithOrders(
    customers: any,
    orders: any,
    cars: any
  ): CustomerWithOrders[] {
    let ordersPassed: CustomerWithOrders[] = [];

    for (let customer of customers) {
      let customerOrders = orders.filter(
        (order: any) => order.customerId === customer.id
      );

      if (customerOrders.length > 0) {
        let customerWithOrders: CustomerWithOrders = {
          customerId: customer.id,
          customerName: customer.name,
          customerPhone: customer.phone,
          orders: [],
        };

        for (let order of customerOrders) {
          let car = cars.find((c: any) => c.id === order.carId);

          customerWithOrders.orders.push({
            orderId: order.id,
            carMake: car.make,
            carModel: car.model,
            carPrice: car.price,
          });
        }

        ordersPassed.push(customerWithOrders);
      }
    }

    return ordersPassed;
  }
}
