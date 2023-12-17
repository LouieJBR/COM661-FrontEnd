import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];

  constructor() {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  addToCart(item: any, quantity: number = 1) {
    const existingItem = this.cartItems.find(cartItem => cartItem.product._id === item._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({product: item, quantity});
    }
    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.product._id !== productId);
    this.saveCart();
  }

  getTotalCost(): number {
    const total = this.cartItems.reduce((acc, cartItem) => {
      return acc + (cartItem.product.price * cartItem.quantity);
    }, 0);

    return Number(total.toFixed(2)); // Rounds to 2 decimal places
  }

  saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    sessionStorage.removeItem('cart');
  }

  updateQuantity(productId: string, newQuantity: number) {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.product._id === productId);
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].quantity = newQuantity;
      this.saveCart();
    }
  }
}
