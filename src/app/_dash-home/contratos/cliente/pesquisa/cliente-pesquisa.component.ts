import { CrudTabsComponent } from '../../../../shared/componentes/crud-tabs/crud-tabs.component'
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TSCrudComponent } from '../../../../shared/topsys/tscrud-component';
import { ICliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { TSCrudService } from '../../../../shared/topsys/tscrud-service';
import { CrudBotoesPesquisaComponent } from "../../../../shared/componentes/crud-botoes-pesquisa/crud-botoes-pesquisa.component";
import { TableModule } from 'primeng/table';
import { CommonModule, AsyncPipe, TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputWrapperComponent } from '../../../../shared/componentes/input-wrapper/input-wrapper.component';
import { InputMaskModule } from 'primeng/inputmask';
import { validationError } from '../../../../shared/util/validationErrorFn';
import { CrudTableComponent } from '../../../../shared/componentes/crud-table/crud-table.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MenuItem } from 'primeng/api';
import { CrudTabsDinamicoComponent } from '../../../../shared/componentes/crud-tabs-dinamico/crud-tabs-dinamico.component';
@Component({
  selector: 'app-cliente-pesquisa',
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
  templateUrl: './cliente-pesquisa.component.html',
  styleUrl: './cliente-pesquisa.component.scss',
  providers: [AsyncPipe, TitleCasePipe]
})
export class ClientePesquisaComponent extends TSCrudComponent<ICliente> {

  displayedColumns: any[] = [];
  itemMenusTabs: MenuItem[] = [
    { label: 'Cadastro', routerLink: `/dash/cliente/cadastro`, skipLocationChange: false },
    { label: 'Pesquisa', routerLink: `/dash/cliente/pesquisa`, skipLocationChange: false }
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
