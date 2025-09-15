import { Routes } from '@angular/router';
import { Layout } from '../Compoents/layout/layout';
import { Product } from '../Compoents/product/product';
import { Aboutus } from '../Compoents/aboutus/aboutus';
import { Contactus } from '../Compoents/contactus/contactus';
import { ProductPayment } from '../Compoents/product-payment/product-payment';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Product,
      },
      {
        path: 'about',
        component: Aboutus,
      },
      {
        path: 'contact',
        component: Contactus,
      },
      {
        path: 'payment',
        component: ProductPayment,
      },
    ],
  },
];
