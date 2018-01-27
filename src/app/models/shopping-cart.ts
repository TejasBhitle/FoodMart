import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart{

  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    for(let productId in itemsMap){
      let item = itemsMap[productId];
      let x = new ShoppingCartItem();
      Object.assign(x,item);
      x.$key = productId;
      this.items.push(x);
    }
  }

  getQuantity(product: Product){
    let item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalItemsCount(): number {
    let count = 0;
    for(let productId in this.items)
      count += this.items[productId].quantity;
    return count;
  }

  get totalPrice(): number{
    let total = 0;
    for(let productId in this.items){
      total += this.items[productId].totalPrice;
    }
    return total;
  }
}
