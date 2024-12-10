import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormsModule } from '@angular/forms';

import { TSCrudComponent } from '../../../shared/topsys/tscrud-component';
import { ICliente } from '../../model/cliente';
import { EstadoService } from '../../services/estado.service';
import { CidadeService } from '../../services/cidade.service';
import { IEstado } from '../../model/estado';
import { ICidade } from '../../model/cidade';
import { ClienteService } from '../../services/cliente.service';
import { TSCrudService } from '../../../shared/topsys/tscrud-service';
import { CrudBotoesCadastroComponent } from "../../../shared/componentes/crud-botoes-cadastro/crud-botoes-cadastro.component";
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { validationError } from '../../../shared/util/validationErrorFn';
import { CommonModule } from '@angular/common';
import { InputWrapperComponent } from '../../../shared/componentes/input-wrapper/input-wrapper.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrl: './cliente-cadastro.component.scss',
  standalone: true,
  imports: [
    CommonModule,
      ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputMaskModule,
    InputWrapperComponent,
    DividerModule,
    ButtonModule,
    FieldsetModule,
    CrudBotoesCadastroComponent
  ],
})
export class ClienteCadastroComponent extends TSCrudComponent<ICliente> {
  private estadoService = inject(EstadoService);
  private cidadeService = inject(CidadeService);
  hasError: Function = validationError;
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
