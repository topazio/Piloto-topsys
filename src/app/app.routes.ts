import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: "cliente/cadastro",
    title: "Cliente - Cadastro",
    async loadComponent() {
      const m = await import('./contratos/cliente/cliente.component');
      return m.ClienteComponent;
    }
  },
  {
    path: "cliente/cadastro/:id",
    title: "Cliente - Editar",
    async loadComponent() {
      const m = await import('./contratos/cliente/cliente.component');
      return m.ClienteComponent;
    }
  },
];
