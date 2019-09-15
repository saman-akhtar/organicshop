import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList ,AngularFireObject} from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase){ }
  getCategory()//:AngularFireList<any[]>
  {
    console.log('calling getcategory in category service');
    return this.db.list('/categories', ref => ref.orderByChild('name'));//.valueChanges();

  //.valueChanges();
    // , ref =>{
    //   let query =ref.orderByChild('name');
    //   return query;
    //   }
  //  ).snapshotChanges();//.valueChanges();// .valueChanges(); // snapshotChanges();
  }
  
}
