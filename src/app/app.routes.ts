import { Routes } from '@angular/router';



export const routes: Routes = [

  {
    path: 'contrato',
    loadChildren: () =>
      import('./contratos/contrato/contrato.route').then(m => m.CONTRATO_ROUTES)
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./contratos/cliente/cliente.route').then(m => m.CLIENTE_ROUTES)
  }
];
