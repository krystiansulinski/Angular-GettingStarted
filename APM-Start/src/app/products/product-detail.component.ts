import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Details';
  product: IProduct;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.productService.getProducts().subscribe({
      next: (products: IProduct[]) =>
        this.product = products.find(p => p.productId === id),
      error: err => this.errorMessage = err,
    })
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
