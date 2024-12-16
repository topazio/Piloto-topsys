import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { CrudBotoesPesquisaComponent } from '../../../../shared/componentes/crud-botoes-pesquisa/crud-botoes-pesquisa.component';
import { CrudTableComponent } from '../../../../shared/componentes/crud-table/crud-table.component';
import { CrudTabsDinamicoComponent } from '../../../../shared/componentes/crud-tabs-dinamico/crud-tabs-dinamico.component';
import { InputWrapperComponent } from '../../../../shared/componentes/input-wrapper/input-wrapper.component';
import { TSCrudComponent } from '../../../../shared/topsys/tscrud-component';
import { TSCrudService } from '../../../../shared/topsys/tscrud-service';
import { ICliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-propostas-pesquisa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    TabMenuModule,
    InputMaskModule,
    ScrollPanelModule,
    TableModule,
    FieldsetModule,
    ButtonModule,
    CrudTabsDinamicoComponent,
    CrudBotoesPesquisaComponent,
    CrudTableComponent
  ],
  templateUrl: './propostas-pesquisa.component.html',
  styleUrl: './propostas-pesquisa.component.scss'
})
export class PropostasPesquisaComponent extends TSCrudComponent<ICliente>  {

  displayedColumns: any[] = [];
  itemMenusTabs: MenuItem[] = [
    { label: 'Cadastro', routerLink: `../cadastro`, skipLocationChange: false },
    { label: 'Pesquisa', routerLink: `../pesquisa`, skipLocationChange: false }
  ];
  override init(): void {
    this.displayedColumns = [
      {
        label: 'Nome Fantasia',
        value: 'nomeFantasia',
        size: '20',
        tdClass: 'text-left',
        flagButtonExcluir: false
      },
      {
        label: "Razão Social",
        value: 'razaoSocial',
        size: '20',
        tdClass: 'text-left',
        flagButtonExcluir: false
      },
      {
        label: "CNPJ",
        value: 'cnpj',
        size: '20',
        tdClass: 'text-center',
        flagButtonExcluir: false
      },
      {
        label: "E-mail",
        value: 'email',
        size: '20',
        tdClass: 'text-center',
        flagButtonExcluir: false
      },
      {
        label: "Telefone",
        value: 'telefone',
        size: '15',
        tdClass: 'text-center',
        flagButtonExcluir: false
      },
      {
        label: 'Excluir',
        value: '',
        size: '5',
        tdClass: 'text-center',
        flagButtonExcluir: true
      },
    ];
    this.cachePage = true;

  }

  constructor(private service: ClienteService) {
    super();
  }

  override getServiceMain(): TSCrudService<ICliente> {
    return this.service;
  }

  override createForm(form?: ICliente): FormGroup {
    return this.formBuilder.group({
      cnpj: [form?.cnpj ?? null],
    });
  }


  pesquisar() {
    let list = this.getServiceMain().findDBJson("cnpj", this.model.cnpj);

    this.items = list;
  }

}
