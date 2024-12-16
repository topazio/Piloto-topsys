import { Routes } from '@angular/router';



export const CLIENTE_ROUTES: Routes = [

  {
    path: "pesquisa",
    title: "Cliente - Pesquisa",
     loadComponent:() =>  (
      import('./pesquisa/cliente-pesquisa.component').then(m => m.ClientePesquisaComponent)
     )
  },
  {
    path: "cadastro",
    title: "Cliente - Cadastro",
     loadComponent: () => (
      import('./cadastro/cliente-cadastro.component').then(m => m.ClienteCadastroComponent)
     )
  },

  {
    path: "cadastro/:id",
    title: "Cliente - Editar",
    loadComponent: () => (
      import('./cadastro/cliente-cadastro.component').then(m => m.ClienteCadastroComponent)
     )
  },
]
