import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return of(this.authService.isAuthenticated).pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          // Redirect to login page with an error message
          this.router.navigate(['/login'], {
            queryParams: {
              returnUrl: state.url,
              error: 'Unauthorized access. Please login.',
            },
          });
        }
      })
    );
  }
}
