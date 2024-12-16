import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: 'login',
    title: "Login - SMED",
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dash',
    loadComponent: () =>
      import('./_dash-home/home-dash.component').then(m => m.HomeDashComponent)
    ,
    loadChildren: () =>
      import('./_dash-home/dash.routes').then(m => m.DASH_ROUTES)
  },
];
