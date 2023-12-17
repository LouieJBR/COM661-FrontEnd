import {Component} from '@angular/core';
import {CartService} from "../../services/CartService";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];
  totalCost: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.cartItems;
    this.calculateTotalCost();
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  calculateTotalCost() {
    this.totalCost = this.cartService.getTotalCost();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  updateQuantity(item: any) {
    // Ensure quantity is valid (e.g., not negative)
    if (item.quantity <= 0) {
      item.quantity = 1; // Set a minimum quantity (e.g., 1)
    }

    // Update the cart service with the new quantity
    this.cartService.updateQuantity(item.product._id, item.quantity);
    this.calculateTotalCost(); // Recalculate total cost after quantity change
  }
}
