import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allProducts: any[] = [];
  totalPrice: Number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.api.getCartAPI().subscribe({
      next: (res: any) => {
        this.allProducts = res;
        console.log(this.allProducts);
        this.calculateTotal();
      },
      error: (reason: any) => {
        console.error('Failed to fetch cart items:', reason);
      }
    });
  }

  deleteItem(id: any): void {
    this.api.removeCart(id).subscribe({
      next: (res: any) => {
        this.getCartAndUpdateCount();
      },
      error: (reason: any) => {
        console.error('Failed to delete item from cart:', reason);
      }
    });
  }

  incrementQuantity(id: any): void {
    this.api.incrementCartAPI(id).subscribe({
      next: (res: any) => {
        this.getCartAndUpdateCount();
      },
      error: (reason: any) => {
        console.error('Failed to increment item quantity:', reason);
      }
    });
  }

  decrementQuantity(id: any): void {
    this.api.decrementCartAPI(id).subscribe({
      next: (res: any) => {
        this.getCartAndUpdateCount();
      },
      error: (reason: any) => {
        console.error('Failed to decrement item quantity:', reason);
      }
    });
  }

  emptyCart(): void {
    this.api.emptyCartAPI().subscribe({
      next: (res: any) => {
        this.getCartAndUpdateCount();
      },
      error: (reason: any) => {
        console.error('Failed to empty cart:', reason);
      }
    });
  }

  private getCartAndUpdateCount(): void {
    this.getCart();
    this.api.getCartCount();
  }

  calculateTotal() {
    this.totalPrice = this.allProducts.reduce((acc, product) => acc + product.totalPrice, 0).toFixed(2);
  }
}

