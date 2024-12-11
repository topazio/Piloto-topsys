import { Routes } from '@angular/router';



export const CLIENTE_ROUTES: Routes = [

  {
    path: "cliente/pesquisa",
    title: "Cliente - Pesquisa",
    async loadComponent() {
      const m = await import('./pesquisa/cliente-pesquisa.component');
      return m.ClientePesquisaComponent;
    }
  },
  {
    path: "cliente/cadastro",
    title: "Cliente - Cadastro",
    async loadComponent() {
      const m = await import('./cadastro/cliente-cadastro.component');
      return m.ClienteCadastroComponent;
    }
  },

  {
    path: "cliente/cadastro/:id",
    title: "Cliente - Editar",
    async loadComponent() {
      const m = await import('./cadastro/cliente-cadastro.component');
      return m.ClienteCadastroComponent;
    }
  },
]
