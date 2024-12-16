import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: 'login',
    title: "Login - SMED",
    loadComponent: () => (
      import('./login/login.component').then(m => m.LoginComponent)
    )
  },
  {
    path: 'dash',
    loadComponent() {
      return import('./_dash-home/home-dash.component').then(m => m.HomeDashComponent);
    },
    loadChildren: () => import('./_dash-home/dash.route').then(m => m.DASH_ROUTES)
  },
  /*
    {
      path: 'contrato',
      loadChildren: () =>
        import('./contratos/contrato/contrato.route').then(m => m.CONTRATO_ROUTES)
    },
    {
      path: 'cliente',
      loadChildren: () =>
        import('./contratos/cliente/cliente.route').then(m => m.CLIENTE_ROUTES)
    },
    {
      path: 'proposta',
      loadChildren: () =>
        import('./contratos/proposta/proposta.route').then(m => m.PROPOSTA_ROUTES)
    },
    {
      path: 'acompanhamentos',
      loadChildren: () =>
        import('./contratos/acompanhamento/acompanhamentos.route').then(m => m.ACOMPANHAMENTOS_ROUTES)
    }
   */
];
