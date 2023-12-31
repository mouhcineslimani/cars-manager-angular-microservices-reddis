import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Route, Router } from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      headers: request.headers.set(
        'x-auth-token',
        this.authService.token ? this.authService.token : ''
      ),
    });

    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      finalize(() => {
        // Finalization logic: Log a message to the console
        console.log('HTTP request completed.');
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log the error to the console (you might want to log it to a server or a logging service in a production environment)
    console.error('HTTP error occurred:', error);

    // Customize error message based on error status or other criteria
    let errorMessage = 'An unexpected error occurred.';

    if (error.status === 403) {
      // Handle 403 Forbidden error
      this.router.navigateByUrl('/admin/notAuthorized');
      errorMessage = 'Access forbidden.';
    }

    // Return a user-friendly error message as an observable
    return throwError(errorMessage);
  }
}
