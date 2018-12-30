import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CoreModule} from '../core.module';
import {AuthorizationService} from '../services/authorization.service';
import {of} from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthorizationService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const {url} = state;
    return of(this.checkLogin(url));
  }

  private checkLogin(url: string): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}
