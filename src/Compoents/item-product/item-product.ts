import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-item-product',
  standalone: true,
  imports: [CommonModule, NgIf, DecimalPipe],
  templateUrl: './item-product.html',
  styleUrls: ['./item-product.css'],
})
export class ItemProduct {
  @Input() product_item: any;

  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();

  onIncrease() {
    this.increase.emit();
  }

  onDecrease() {
    this.decrease.emit();
  }

  onAdd() {
    this.addToCart.emit();
  }
}
