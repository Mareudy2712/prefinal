import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPayment } from './product-payment';

describe('ProductPayment', () => {
  let component: ProductPayment;
  let fixture: ComponentFixture<ProductPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
