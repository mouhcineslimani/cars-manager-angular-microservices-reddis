import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = 'http://localhost:8888/car-service/cars';

  constructor(private http: HttpClient) {}

  getCars(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCarById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  getCarByMake(make: String): Observable<any> {
    const url = `${this.apiUrl}/make${make}`;
    return this.http.get(url);
  }

  addCar(car: any): Observable<any> {
    return this.http.post(this.apiUrl, car);
  }

  updateCar(id: number, updatedCar: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, updatedCar);
  }

  deleteCar(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  // searchCars(make: string): Observable<any> {
  //   const searchUrl = `${this.apiUrl}/make/${make}`;
  //   return this.http.get(searchUrl);
  // }
}
