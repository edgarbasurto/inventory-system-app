import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'products', loadComponent: ()=> import('./components/product/product-list/product-list.component').then(m=> m.ProductListComponent)},
    {path: 'products/edit/:id', loadComponent: ()=> import('./components/product/product-form/product-form.component').then(m=> m.ProductFormComponent)},
    {path: 'products/new', loadComponent: ()=> import('./components/product/product-form/product-form.component').then(m=> m.ProductFormComponent)},
    { path: '**', redirectTo: 'products' },
];
