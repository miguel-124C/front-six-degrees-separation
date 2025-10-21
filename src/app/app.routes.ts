import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=> import('./pages/home/home.component').then( c => c.HomeComponent)
  }, {
    path: 'login',
    loadComponent: ()=> import('./pages/login/login.component').then( c => c.LoginComponent)
  }, {
    path: '404',
    loadComponent: ()=> import('./pages/notfound/notfound.component').then( c => c.NotfoundComponent)
  }, {
    path: '**',
    pathMatch: 'prefix',
    redirectTo: '404'
  }
];