import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProduct } from './item-product';

describe('ItemProduct', () => {
  let component: ItemProduct;
  let fixture: ComponentFixture<ItemProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
