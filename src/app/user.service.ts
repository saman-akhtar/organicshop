import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database'; // , FirebaseObjectObservable depracted
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User) {
    console.log('user name and email', user.displayName, user.email);
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  get(uid: String): AngularFireObject<AppUser> { // AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
