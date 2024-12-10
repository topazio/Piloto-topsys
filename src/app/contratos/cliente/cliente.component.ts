import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimeTabsComponent } from '../../shared/componentes/prime-tabs/prime-tabs.component';
import { ClienteCadastroComponent } from './cadastro/cliente-cadastro.component';
import { ClientePesquisaComponent } from "./pesquisa/cliente-pesquisa.component";
@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    CommonModule,
    PrimeTabsComponent
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
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
