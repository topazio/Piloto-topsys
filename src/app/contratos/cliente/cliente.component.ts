import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClienteCadastroComponent } from './cadastro/cliente-cadastro.component';
import { ClientePesquisaComponent } from "./pesquisa/cliente-pesquisa.component";
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CrudTabsComponent } from '../../shared/componentes/crud-tabs/crud-tabs.component';
@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    CrudTabsComponent
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
})
export class ClienteComponent implements OnInit {
  tabsFor: any[] = [];
  ngOnInit() {
    this.tabsFor = [
      {
        label: 'Cadastro',
        tabCstIndex: 0,
        contentTab: ClienteCadastroComponent,
        showButtonCadastroDiv: true,
        tabPanelCache: false,
      },
      {
        label: 'Pesquisa',
        tabCstIndex: 1,
        contentTab: ClientePesquisaComponent,
        tabPanelCache: false,
      }
    ];
  };
}
