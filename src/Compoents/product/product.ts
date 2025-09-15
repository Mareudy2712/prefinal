import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ItemProduct } from '../item-product/item-product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ItemProduct, RouterLink],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class Product implements OnInit {
  product_items: any[] = [];
  cart: any[] = [];
  total: number = 0; // total quantity of all items

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('https://dummyjson.com/products').subscribe((res) => {
      const savedMap = JSON.parse(localStorage.getItem('productAddCartMap') || '{}');
      this.product_items = res.products.map((item: any) => ({
        ...item,
        addcart: savedMap[item.id] || 0,
      }));
    });

    const storedCart = localStorage.getItem('cart');
    const storedTotal = localStorage.getItem('total');

    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.total = storedTotal ? JSON.parse(storedTotal) : 0;
  }

  updateCart(product: any) {
    const index = this.cart.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.cart[index].addcart = product.addcart;
    } else {
      this.cart.push({ ...product });
    }

    // remove 0 qty items
    this.cart = this.cart.filter((p) => p.addcart > 0);
    // update total count
    this.total = this.cart.reduce((acc, p) => acc + p.addcart, 0);

    // save cart info
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('total', JSON.stringify(this.total));

    // save product quantity map for faster loading
    const map: Record<number, number> = {};
    this.cart.forEach((item) => (map[item.id] = item.addcart));
    localStorage.setItem('productAddCartMap', JSON.stringify(map));

    // *** Save cart as checkoutItems for payment page ***
    localStorage.setItem('checkoutItems', JSON.stringify(this.cart));
  }

  onIncrease(product: any) {
    product.addcart = (product.addcart || 0) + 1;
    this.updateCart(product);
  }

  onDecrease(product: any) {
    if (product.addcart > 0) {
      product.addcart--;
      this.updateCart(product);
    }
  }

  onAddToCart(product: any) {
    this.updateCart(product);
  }

  // Optional: Call this method to navigate to payment page
  proceedToPayment() {
    // Save the current cart as checkoutItems (just in case)
    localStorage.setItem('checkoutItems', JSON.stringify(this.cart));
    this.router.navigate(['/product-payment']); // Adjust route if needed
  }

  clearCart(): void {
    this.cart = [];
    this.total = 0;

    // Clear from local storage
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
    localStorage.removeItem('checkoutItems');
    localStorage.removeItem('productAddCartMap');

    // Also reset product_items addcart count if needed
    this.product_items = this.product_items.map((item) => ({
      ...item,
      addcart: 0,
    }));
  }
}
