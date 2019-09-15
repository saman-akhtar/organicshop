import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import 'rxjs/add/operator/map';
import 'rxjs';
import { map } from 'rxjs/operators';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: any, state: RouterStateSnapshot) {
   return this.auth.user$.pipe(map(user => { // map
      if (user) { return true; }

      this.router.navigate(['/login'], { queryParams : { returnUrl: state.url }});
      return false;
    }));
  }
}
