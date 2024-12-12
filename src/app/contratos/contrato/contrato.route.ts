import { Routes } from '@angular/router';



export const CONTRATO_ROUTES: Routes = [

  {
    path: "pesquisa",
    title: "Contrato - Pesquisa",
     loadComponent:() =>  (
      import('./pesquisa/contrato-pesquisa.component').then(m => m.ContratoPesquisaComponent)
     )
  },
  {
    path: "cadastro",
    title: "Contrato - Cadastro",
     loadComponent: () => (
      import('./cadastro/contrato-cadastro.component').then(m => m.ContratoCadastroComponent)
     )
  },

  {
    path: "cadastro/:id",
    title: "Contrato - Editar",
    loadComponent: () => (
      import('./cadastro/contrato-cadastro.component').then(m => m.ContratoCadastroComponent)
     )
  },
]
