import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of, pipe } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap , map } from 'rxjs/operators';

 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
     private route: ActivatedRoute,
     private userService: UserService ) {
    this.user$ = afAuth.authState;
    console.log(' afAuth.authState in auth service value', afAuth.authState);
  }

  login() {
    console.log('logging in..');
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      }
  logout() {
    this.afAuth.auth.signOut();
  }
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
    switchMap(users => {
          if (users) {
          console.log('Auth service if part');
          return this.userService.get(users.uid).valueChanges();
        }
          return of(null);

      }));
      }
    }
