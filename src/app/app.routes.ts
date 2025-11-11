import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=> import('./pages/home/home.component').then( c => c.HomeComponent)
  },{
    path: 'game',
    loadComponent: ()=> import('./pages/game/game.component').then( c => c.GameComponent)
  },{
    path: 'examen',
    loadComponent: ()=> import('./pages/examen/examen').then( c => c.Examen)
  },{
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