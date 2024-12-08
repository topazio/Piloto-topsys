import { Routes } from '@angular/router';
import { ClienteCadastroComponent } from './contratos/cliente/cadastro/cliente-cadastro.component';
import { ClientePesquisaComponent } from './contratos/cliente/pesquisa/cliente-pesquisa.component';


export const routes: Routes = [


  {
    path: "cliente/cadastro",
    title: "Cliente - Cadastro",
    component: ClienteCadastroComponent
  },

  {
    path: "cliente/edit/:id",
    title: "Cliente - Editar",
    component: ClienteCadastroComponent
  },

  {
    path: "cliente/pesquisa",
    title: "Cliente - Pesquisa",
    component: ClientePesquisaComponent
  }
];
