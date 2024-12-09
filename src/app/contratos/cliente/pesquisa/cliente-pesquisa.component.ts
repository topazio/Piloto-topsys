import { Component} from '@angular/core';
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
import { CrudTabComponent } from "../../../shared/componentes/crud-tab/crud-tab.component";


@Component({
  selector: 'app-cliente-pesquisa',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatTabsModule,
    MatDivider,
    MatTableModule,
    MatIcon,
    CrudBotoesPesquisaComponent,
    CrudTabComponent

],
  templateUrl: './cliente-pesquisa.component.html',
  styleUrl: './cliente-pesquisa.component.scss',
})
export class ClientePesquisaComponent extends TSCrudComponent<ICliente> {

  displayedColumns: string[] = [];

  override init(): void {
    this.displayedColumns = [
      'nomeFantasia',
      'razaoSocial',
      'cnpj',
      'email',
      'telefone',
      'editar',
      'excluir',
    ];
  }

  constructor(private service: ClienteService){
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


  pesquisar(){
    let list = this.getServiceMain().findDBJson("cnpj",this.model.cnpj);

    this.dataSource = list;
  }



}
