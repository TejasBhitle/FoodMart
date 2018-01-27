import { AuthService } from './../auth.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent implements OnInit{

  //appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private cartService: ShoppingCartService) {

  }


  async ngOnInit(){
    //auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart()

  }

  logout(){
    this.auth.logout();
  }


}
