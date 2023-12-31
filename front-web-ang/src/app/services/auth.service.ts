import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  token!: any;
  profile: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(
      'http://localhost:8888/auth-service/login',
      body.toString(),
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
        observe: 'response',
      }
    );
  }

  loadProfile() {
    return this.http.get('http://localhost:8888/auth-service/profile');
  }

  logout() {
    this.profile = undefined;
    this.token = undefined;
    this.isAuthenticated = false;
  }

  hasRole(role: string): boolean {
    // Check if this.profile is defined
    if (this.profile && this.profile.authorities) {
      // Use Array.some() to check if at least one authority matches the specified role
      return this.profile.authorities.some((a: any) => a.authority === role);
    }

    // If this.profile or this.profile.authorities is undefined, return false
    return false;
  }
}
