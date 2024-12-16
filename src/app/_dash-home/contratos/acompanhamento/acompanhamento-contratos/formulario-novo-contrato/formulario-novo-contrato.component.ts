import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabMenuModule } from 'primeng/tabmenu';
import { firstValueFrom } from 'rxjs';
import { InputWrapperComponent } from '../../../../../shared/componentes/input-wrapper/input-wrapper.component';
import { TSCrudComponent } from '../../../../../shared/topsys/tscrud-component';
import { TSCrudService } from '../../../../../shared/topsys/tscrud-service';
import { ICidade } from '../../../model/cidade';
import { ICliente } from '../../../model/cliente';
import { IEstado } from '../../../model/estado';
import { CidadeService } from '../../../services/cidade.service';
import { ClienteService } from '../../../services/cliente.service';
import { EstadoService } from '../../../services/estado.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrudDialogsBotoesCadastroComponent } from "../../../../../shared/componentes/crud-dialogs-botoes-cadastro/crud-dialogs-botoes-cadastro.component";

@Component({
  selector: 'app-formulario-novo-contrato',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputMaskModule,
    DynamicDialogModule,
    InputWrapperComponent,
    ScrollPanelModule,
    TabMenuModule,
    DividerModule,
    ButtonModule,
    FieldsetModule,
    CrudDialogsBotoesCadastroComponent
  ],
  templateUrl: './formulario-novo-contrato.component.html',
  styleUrl: './formulario-novo-contrato.component.scss'
})
export class FormularioNovoContratoComponent extends TSCrudComponent<ICliente> {
  private estadoService = inject(EstadoService);
  private cidadeService = inject(CidadeService);

  estados = [] as IEstado[];
  cidades = [] as ICidade[];

  constructor(private service: ClienteService, public dialogService: DialogService, public refInterno: DynamicDialogRef) {
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
      id: [form?.id ?? null],
      nomeFantasia: [form?.nomeFantasia ?? null, Validators.required],
      razaoSocial: [form?.razaoSocial ?? null, Validators.required],
      cnpj: [form?.cnpj ?? null, Validators.required],
      endereco: [form?.endereco ?? null, Validators.required],
      cidadeId: [form?.cidadeId ?? null, Validators.required],
      estadoId: [0, Validators.required],
      telefone: [form?.telefone ?? null, Validators.required],
      email: [form?.email ?? null, Validators.required],
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
