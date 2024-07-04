import { Routes } from '@angular/router';
import { ListComponent } from './components/products/list.component'
import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NewProductComponent } from './components/products/new-product.component';
import { ProductComponent } from './components/products/product.component';
import { EditProductComponent } from './components/products/edit-product.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    children: [{ path: 'home', component: HomeComponent }],
    canActivate: [AuthGuardService],
  },
  { path: 'products', component:  ListComponent },
  { path: 'navbar', component:  NavbarComponent },
  { path: 'products/:id', component:  ProductComponent },
  { path: 'products/edit/:id', component:  EditProductComponent },
  { path: 'new', component: NewProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
