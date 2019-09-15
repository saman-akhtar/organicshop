import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {

    console.log('calling category service on product form component');
    this.categories$ = categoryService.getCategory().valueChanges();
    console.log('after  on product form component', this.categories$);

    this.id = this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line:curly
    console.log('id for edit field is :', this.id);
    // tslint:disable-next-line:curly
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(prod => this.product = prod); // take(1).
   }
save(product) {
  console.log('Saving product');

  if (this.id) { this.productService.update(this.id, product);
  } else {   this.productService.create(product);
  }
  console.log('Navigating to /admin/products');
  this.router.navigate(['/admin/products']);
}
delete(product) {
  console.log('Deleting product');
if (!confirm('Are you sure you want to delete this product')) { return; }
  this.productService.delete(this.id);
  this.router.navigate(['/admin/products']);
}
  ngOnInit() {
  }

}
