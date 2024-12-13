import { Routes } from '@angular/router';



export const PROPOSTA_ROUTES: Routes = [

  {
    path: "pesquisa",
    title: "Proposta - Pesquisa",
     loadComponent:() =>  (
      import('./pesquisa/propostas-pesquisa.component').then(m => m.PropostasPesquisaComponent)
     )
  },
  {
    path: "cadastro",
    title: "Proposta - Cadastro",
     loadComponent: () => (
      import('./cadastro/propostas-cadastro.component').then(m => m.PropostasCadastroComponent)
     )
  },

  {
    path: "cadastro/:id",
    title: "Proposta - Editar",
    loadComponent: () => (
      import('./cadastro/propostas-cadastro.component').then(m => m.PropostasCadastroComponent)
     )
  },
]
