import { CommonModule, AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { CrudBotoesPesquisaComponent } from '../../../shared/componentes/crud-botoes-pesquisa/crud-botoes-pesquisa.component';
import { CrudTableComponent } from '../../../shared/componentes/crud-table/crud-table.component';
import { InputWrapperComponent } from '../../../shared/componentes/input-wrapper/input-wrapper.component';
import { TSCrudComponent } from '../../../shared/topsys/tscrud-component';
import { TSCrudService } from '../../../shared/topsys/tscrud-service';
import { ICliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { MenuItem } from 'primeng/api';
import { CrudTabsDinamicoComponent } from '../../../shared/componentes/crud-tabs-dinamico/crud-tabs-dinamico.component';

@Component({
  selector: 'app-contrato-pesquisa',
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
  templateUrl: './contrato-pesquisa.component.html',
  styleUrl: './contrato-pesquisa.component.scss',
  providers: [AsyncPipe, TitleCasePipe]
})
export class ContratoPesquisaComponent extends TSCrudComponent<ICliente> implements OnDestroy {

  displayedColumns: any[] = [];
  itemMenusTabs: MenuItem[] = [
    { label: 'Cadastro', routerLink: `/contrato/cadastro`, skipLocationChange: false },
    { label: 'Pesquisa', routerLink: `/contrato/pesquisa`, skipLocationChange: false }
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
  ngOnDestroy(): void {
    if (this.formGroup.value) {
      sessionStorage.setItem('filtros', JSON.stringify(this.formGroup.value))
    }

  }

}
