import { Routes } from '@angular/router';



export const ACOMPANHAMENTOS_ROUTES: Routes = [

  {
    path: "contrato",
    title: "Acompanhamentos - Contratos",
     loadComponent:() =>  (
      import('./acompanhamento-contratos/acompanhamento-contratos.component').then(m => m.AcompanhamentoContratosComponent)
     )
  },
  {
    path: "proposta",
    title: "Acompanhamentos - Propostas",
     loadComponent: () => (
       import('./acompanhamento-contratos/acompanhamento-contratos.component').then(m => m.AcompanhamentoContratosComponent)
     )
  },

  {
    path: "cliente",
    title: "Acompanhamentos - Clientes",
    loadComponent: () => (
       import('./acompanhamento-contratos/acompanhamento-contratos.component').then(m => m.AcompanhamentoContratosComponent)
     )
  },
]
