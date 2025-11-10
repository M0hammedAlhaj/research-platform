import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { Login } from './features/login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: Login},
  { path: '**', redirectTo: '' }
];
