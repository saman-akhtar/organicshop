import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  delete(productId) {
    return this.db.list('/products' + productId).remove();
    }

  constructor(private db: AngularFireDatabase) { }
  create(product) {
    return this.db.list('/products').push(product); // .valueChanges();

  }
 getAll() {
  console.log('In prod service, val of product$= list:', this.db.list('/products'));
    return this.db.list('/products'); // .valueChanges();

  }
  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }
  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }
}
