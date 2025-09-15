import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-payment',
  standalone: true,
  imports: [CommonModule], // Needed for *ngIf, *ngFor, pipes
  templateUrl: './product-payment.html',
  styleUrls: ['./product-payment.css'],
})
export class ProductPayment implements OnInit {
  checkoutItems: any[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    const stored = localStorage.getItem('checkoutItems');
    this.checkoutItems = stored ? JSON.parse(stored) : [];

    this.totalPrice = this.checkoutItems.reduce((acc, item) => {
      const discountedPrice = item.price - (item.price * item.discountPercentage) / 100;
      return acc + discountedPrice * item.addcart;
    }, 0);
  }
  alert() {
    alert('Payment processing not implemented');
  }
}
