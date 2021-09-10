import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.connectedUser) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
