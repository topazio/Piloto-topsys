import { CrudTableExpansivaComponent } from '../../../../shared/componentes/crud-table-expansiva/crud-table-expansiva.component'
import { CommonModule, AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { CrudBotoesPesquisaComponent } from '../../../../shared/componentes/crud-botoes-pesquisa/crud-botoes-pesquisa.component';
import { InputWrapperComponent } from '../../../../shared/componentes/input-wrapper/input-wrapper.component';
import { TSCrudComponent } from '../../../../shared/topsys/tscrud-component';
import { TSCrudService } from '../../../../shared/topsys/tscrud-service';
import { ICliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CrudTableComponent } from '../../../../shared/componentes/crud-table/crud-table.component';
import { ContratoCadastroComponent } from '../../contrato/cadastro/contrato-cadastro.component';
import { IContrato } from '../../model/contrato';
import { Observable, of, filter } from 'rxjs';
import { FormularioNovoContratoComponent } from './formulario-novo-contrato/formulario-novo-contrato.component';

@Component({
  selector: 'app-acompanhamento-contratos',
  standalone: true,
  imports: [
    CrudTableExpansivaComponent,
    CommonModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    InputTextModule,
    PanelModule,
    ScrollPanelModule,
    TableModule,
    InputIconModule,
    InputGroupModule,
    ButtonModule,
    IconFieldModule,
    DividerModule,
    InputMaskModule,
    ScrollPanelModule,
    TableModule,
    FieldsetModule,
    ButtonModule,
    CrudBotoesPesquisaComponent,
    CrudTableComponent
  ],
  templateUrl: './acompanhamento-contratos.component.html',
  styleUrl: './acompanhamento-contratos.component.scss',
  providers: [AsyncPipe, TitleCasePipe, DialogService]
})
export class AcompanhamentoContratosComponent extends TSCrudComponent<ICliente, IContrato> {
  displayedColumns: any[] = [];

  displayedColumnsExpandidas: any[] = [];
  detailRequestMethod: (id: number | string) => Observable<IContrato[]> = (id: number | string) => new Observable<IContrato[]>();
  elementExpanded: Record<number | string, any> = {};
  override init(): void {
    this.displayedColumns = [
      {
        label: 'Nome Fantasia',
        value: 'nomeFantasia',
        size: '20',
        tdClass: 'text-left',
        tdIconExand: true,
        tdExpandKey: 'contratos',
        flagButtonExcluir: false
      },
      {
        label: "Razão Social",
        value: 'razaoSocial',
        size: '20',
        tdClass: 'text-left',
        tdIconExand: false,
        flagButtonExcluir: false
      },
      {
        label: "CNPJ",
        value: 'cnpj',
        size: '20',
        tdClass: 'text-center',
        tdIconExand: false,
        flagButtonExcluir: false
      },
      {
        label: "E-mail",
        value: 'email',
        size: '20',
        tdClass: 'text-center',
        tdIconExand: false,
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
        tdIconExand: false,
        flagButtonExcluir: true
      },
    ];
    this.cachePage = true;
    this.displayedColumnsExpandidas = [
      {
        label: 'ID',
        value: 'id',
        size: '20',
        tdClass: 'text-left'
      },
      {
        label: 'Cliente ID',
        value: 'clienteId',
        size: '20',
        tdClass: 'text-left'
      },
      {
        label: 'Data Inicio',
        value: 'dataInicio',
        size: '20',
        tdClass: 'text-left'
      },
      {
        label: 'Data Fim',
        value: 'dataFim',
        size: '20',
        tdClass: 'text-left'
      },
      {
        label: 'Valor',
        value: 'valor',
        size: '20',
        tdClass: 'text-left'
      }
    ];

  }

  constructor(private service: ClienteService) {
    super();
    this.detailRequestMethod = this.findChildrenDetail.bind(this);
  }

  override getServiceMain(): TSCrudService<ICliente> {
    return this.service;
  }


  openDialog(id?: string | number) {
    this.ref = this.openDialogEdit(id ?? null, FormularioNovoContratoComponent);

    this.ref?.onClose.subscribe((data: any) => {
      if (!data) {
        console.log('Form data:', data);
      }
      this.snackBarService.error('Erro');
    });
  };

  override createForm(form?: ICliente): FormGroup {
    return this.formBuilder.group({
      cnpj: [form?.cnpj ?? null],
    });
  };

  cliqueDevolver(id: number | string) {
    if (id) {
      this.detailRequestMethod(id).subscribe((val) => {
        this.elementExpanded[id] = val;
      });
    }
  };

  requestedClique(event: any) {
    if (event) {
      console.log('Evento no pai:', event);
      this.cliqueDevolver(event);
    }
  };
  override resetForm() {
    super.resetForm();
  }

  override findChildrenDetail(id: number | string): Observable<IContrato[]> {
    const mock = [
      { id: 0, clienteId: "e354", dataInicio: "2021-07-01", dataFim: "2021-07-31", valor: "1000.00", status: "1" },
      { id: 1, clienteId: "0", dataInicio: "2021-07-01", dataFim: "2021-07-31", valor: "5000.00", status: "3" },
    ];
    let res = mock.filter(item => item.clienteId === id);
    return of(res);
  };

  pesquisar() {
    let list = this.getServiceMain().findDBJson("cnpj", this.model.cnpj);

    this.items = list;
  };

}
