import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
products: Product[];
subscription: Subscription;
filteredProducts: any[];
  //  this.subscription = this.prodService.getAll().valueChanges().
  //  subscribe(products => this.filteredProducts = this.products  = products);
  //   console.log('In Admin prod com, val of product$:', this.products);
  // }
  constructor(private prodService: ProductService) {

    this.filteredProducts = this.products = this.prodService.getAll().snapshotChanges().pipe(
    map(products => {return products.map(product => {
      const key = product.key;
      const value = product.payload.val();
      return {key, ...value};
    });
   }));
  }
filter(query) {
  console.log('In Admin prod com, val of query:', query);
  this.filteredProducts = (query) ?
  this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  this.products ;


}
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
