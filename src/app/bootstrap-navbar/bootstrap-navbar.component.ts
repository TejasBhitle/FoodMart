import { AuthService } from './../auth.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent implements OnInit{

  //appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(public auth: AuthService, private cartService: ShoppingCartService) {

  }


  async ngOnInit(){
    //auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.cartService.getCart()
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for(let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;

    })
  }

  logout(){
    this.auth.logout();
  }


}
