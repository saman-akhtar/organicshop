import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
 // appUser: AppUser;
  constructor(private auth: AuthService, private userService: UserService ) {
    }
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin));
       }// .map(appUser => appUser.isAdmin));     // .map(appUser => appUser.isAdmin));
    }

