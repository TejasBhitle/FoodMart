import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
      return this.db.list('/shopping-cart').push({
        dateCreated: new Date().getTime()
      })
  }

  async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>>{
    let cartId = await this.getorCreateCartId();
    return this.db.object('/shopping-cart/'+cartId);
  }

  //aync method as synchronous
  private async getorCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/'+ cartId +'/items/'+ productId);
  }

  async addToCart(product: Product){
    this.updateItemQuanity(product,1);
  }

  async removeFromCart(product: Product){
    this.updateItemQuanity(product,-1);
  }

  private async updateItemQuanity(product: Product, change: number){
    let cartId = await this.getorCreateCartId();
    let item$ = this.getItem(cartId,product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + change });
    })
  }

}
