import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  categories$;

 constructor(private prodService: ProductService, private categoryService: CategoryService) {
this.products$ = this.prodService.getAll().valueChanges();
this.categories$ = this.categoryService.getCategory().valueChanges();
  }

}
