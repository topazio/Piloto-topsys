import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaskDirective } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { TSCrudComponent } from '../../../shared/topsys/tscrud-component';
import { ICliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { TSCrudService } from '../../../shared/topsys/tscrud-service';
import { CrudBotoesPesquisaComponent } from "../../../shared/componentes/crud-botoes-pesquisa/crud-botoes-pesquisa.component";
import { TableModule } from 'primeng/table';
import { CommonModule, AsyncPipe, TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { FieldsetModule } from 'primeng/fieldset';
import { InputWrapperComponent } from '../../../shared/componentes/input-wrapper/input-wrapper.component';
import { InputMaskModule } from 'primeng/inputmask';
import { validationError } from '../../../shared/util/validationErrorFn';
import { CrudTableComponent } from '../../../shared/componentes/prime-tabs/crud-table/crud-table.component';
@Component({
  selector: 'app-cliente-pesquisa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    InputWrapperComponent,
    InputMaskModule,
    MatIcon,
    TableModule,
    FieldsetModule,
    ButtonModule,
    CrudBotoesPesquisaComponent,
    CrudTableComponent
  ],
  templateUrl: './cliente-pesquisa.component.html',
  styleUrl: './cliente-pesquisa.component.scss',
  providers: [AsyncPipe, TitleCasePipe]
})
export class ClientePesquisaComponent extends TSCrudComponent<ICliente> {

  displayedColumns: string[] = [];
  resultadoSelecionado!: ICliente;
  hasError: Function = validationError;
  override init(): void {
    this.displayedColumns = [
      'Nome Fantasia',
      'Razão Social',
      'CNPJ',
      'E-mail',
      'Telefone',
      'Editar',
      'Excluir',
    ];
  }

  constructor(private service: ClienteService) {
    super();
  }

  override getServiceMain(): TSCrudService<ICliente> {
    return this.service;
  }

  override createForm(form?: ICliente): FormGroup {
    return this.formBuilder.group({
      cnpj: [null],
    });
  }


  pesquisar() {
    let list = this.getServiceMain().findDBJson("cnpj", this.model.cnpj);

    this.items = list;
  }



}
