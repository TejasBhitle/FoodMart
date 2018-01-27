import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  filteredProducts : Product[] = [];
  cart : any;
  category: string;
  subscription : Subscription;

  constructor(route:ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) {

    productService
      .getAll()
      .switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })
    .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category)?
          this.products.filter(p => p.category === this.category):
          this.products;
    });


  }

  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe( cart => {this.cart = cart });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
