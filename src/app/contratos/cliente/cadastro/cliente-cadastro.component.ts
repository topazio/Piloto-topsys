import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective } from 'ngx-mask';

import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { TSCrudComponent } from '../../../shared/topsys/tscrud-component';
import { ICliente } from '../../model/cliente';
import { EstadoService } from '../../services/estado.service';
import { CidadeService } from '../../services/cidade.service';
import { IEstado } from '../../model/estado';
import { ICidade } from '../../model/cidade';
import { ClienteService } from '../../services/cliente.service';
import { TSCrudService } from '../../../shared/topsys/tscrud-service';
import { CrudBotoesCadastroComponent } from "../../../shared/componentes/crud-botoes-cadastro/crud-botoes-cadastro.component";
import { CrudTabComponent } from '../../../shared/componentes/crud-tab/crud-tab.component';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrl: './cliente-cadastro.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatTabsModule,
    CrudTabComponent,
    CrudBotoesCadastroComponent
],
})
export class ClienteCadastroComponent extends TSCrudComponent<ICliente> {
  private estadoService = inject(EstadoService);
  private cidadeService = inject(CidadeService);

  estados = [] as IEstado[];
  cidades = [] as ICidade[];

  constructor(private service: ClienteService) {
    super();
  }

  override getServiceMain(): TSCrudService<ICliente> {
    return this.service;
  }

  override init(): void {
    this.popularEstado();
  }

  override async detail(id: any): Promise<void> {
    await super.detail(id);

    let estadoId = (await firstValueFrom(this.cidadeService.getById(this.model.cidadeId))).estadoId;

    this.popularCidade(estadoId);
  }


  override resetForm() {
    super.resetForm();
    this.cidades = [];
  }

  override createForm(form?: ICliente): FormGroup {
    return this.formBuilder.group({
      id: [form?.id],
      nomeFantasia: [form?.nomeFantasia, Validators.required],
      razaoSocial: [form?.razaoSocial, Validators.required],
      cnpj: [form?.cnpj, Validators.required],
      endereco: [form?.endereco, Validators.required],
      cidadeId: [form?.cidadeId, Validators.required],
      estadoId: [0, Validators.required],
      telefone: [form?.telefone, Validators.required],
      email: [form?.email, Validators.required],
    });
  }

  popularCidade(estadoId?: number) {
    if (estadoId) {
      this.formGroup.patchValue({ estadoId: estadoId });
    }

    this.cidadeService.listPorEstado(this.formGroup.value.estadoId).subscribe((data) => (this.cidades = data));
  }

  popularEstado() {
    this.estadoService.getAll().subscribe((data) => (this.estados = data));
  }
}
