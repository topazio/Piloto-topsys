import { Routes } from '@angular/router';



export const routes: Routes = [
/* {path: 'cliente',
  title: 'Cliente',
  async loadChildren(){
    const ch = await import('./contratos/cliente/clientes.route');
    return ch.CLIENTE_ROUTES
  }
} */

  {
    path: "contrato/pesquisa",
    title: "Contrato - Pesquisa",
    async loadComponent() {
      const m = await import('./contratos/contrato/pesquisa/contrato-pesquisa.component');
      return m.ContratoPesquisaComponent;
    }

  },
  {
    path: "contrato/cadastro",
    title: "Contrato - Cadastro",
    async loadComponent() {
      const m = await import('./contratos/contrato/cadastro/contrato-cadastro.component');
      return m.ContratoCadastroComponent;
    }
  },

  {
    path: "contrato/cadastro/:id",
    title: "Contrato - Editar",
    async loadComponent() {
      const m = await import('./contratos/contrato/cadastro/contrato-cadastro.component');
      return m.ContratoCadastroComponent;
    }
  },
   {
    path: "cliente/pesquisa",
    title: "Cliente - Pesquisa",
    async loadComponent() {
      const m = await import('./contratos/cliente/pesquisa/cliente-pesquisa.component');
      return m.ClientePesquisaComponent;
    }
  },
  {
    path: "cliente/cadastro",
    title: "Cliente - Cadastro",
    async loadComponent() {
      const m = await import('./contratos/cliente/cadastro/cliente-cadastro.component');
      return m.ClienteCadastroComponent;
    }
  },

  {
    path: "cliente/cadastro/:id",
    title: "Cliente - Editar",
    async loadComponent() {
      const m = await import('./contratos/cliente/cadastro/cliente-cadastro.component');
      return m.ClienteCadastroComponent;
    }
  },
];
