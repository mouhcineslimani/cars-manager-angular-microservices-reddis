import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8888/customer-service/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteCustomer(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateCustomer(id: string, updatedCustomer: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, updatedCustomer);
  }

  getCustomerById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  searchCustomersByName(name: string): Observable<any> {
    const searchUrl = `${this.apiUrl}/search?name=${name}`;
    return this.http.get(searchUrl);
  }

  getCustomersWithOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/with-orders');
  }
}
