import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkRoleAndRedirect('ROLE_ADMIN');
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check authentication and authorization conditions
    if (!this.authService.isAuthenticated) {
      return false; // Don't allow access
    }

    // Check specific role if needed
    const requiredRole = childRoute.data?.['requiresAdmin'];
    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.redirectToUnauthorizedPage();
      return false;
    }

    return true; // Allow access
  }

  private checkRoleAndRedirect(role: string): boolean {
    const hasRole = this.authService.hasRole(role);

    if (!hasRole) {
      this.redirectToUnauthorizedPage();
      return false;
    }

    return true; // Allow access
  }

  private redirectToUnauthorizedPage(): void {
    this.router.navigateByUrl('/unauthorized');
  }
}
