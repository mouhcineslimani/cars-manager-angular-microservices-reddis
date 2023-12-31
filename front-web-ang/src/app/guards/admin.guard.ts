import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.hasRole('ROLE_ADMIN')) {
      return true;
    } else {
      this.router.navigateByUrl('/admin/notAuthorized');
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // Check authentication and authorization conditions
    if (!this.authService.isAuthenticated) {
      return of(false); // Don't allow access
    }
    if (
      !this.authService.hasRole('admin') && // Check specific role if needed
      childRoute.data['requiresAdmin']
    ) {
      return of(this.router.createUrlTree(['/unauthorised'])); // Redirect to unauthorized page
    }
    return of(true); // Allow access
  }
}
