import { Routes } from '@angular/router';



export const DASH_ROUTES: Routes = [

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
]
