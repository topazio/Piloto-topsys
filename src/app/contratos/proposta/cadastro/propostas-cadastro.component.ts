import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
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
import { CrudBotoesCadastroComponent } from '../../../shared/componentes/crud-botoes-cadastro/crud-botoes-cadastro.component';
import { CrudTabsDinamicoComponent } from '../../../shared/componentes/crud-tabs-dinamico/crud-tabs-dinamico.component';
import { InputWrapperComponent } from '../../../shared/componentes/input-wrapper/input-wrapper.component';
import { TSCrudComponent } from '../../../shared/topsys/tscrud-component';
import { TSCrudService } from '../../../shared/topsys/tscrud-service';
import { ICidade } from '../../model/cidade';
import { ICliente } from '../../model/cliente';
import { IEstado } from '../../model/estado';
import { CidadeService } from '../../services/cidade.service';
import { ClienteService } from '../../services/cliente.service';
import { EstadoService } from '../../services/estado.service';

@Component({
  selector: 'app-propostas-cadastro',
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
    ScrollPanelModule,
    TabMenuModule,
    DividerModule,
    ButtonModule,
    FieldsetModule,
    CrudTabsDinamicoComponent,
    CrudBotoesCadastroComponent
  ],
  templateUrl: './propostas-cadastro.component.html',
  styleUrl: './propostas-cadastro.component.scss'
})
export class PropostasCadastroComponent  extends TSCrudComponent<ICliente> {
  private estadoService = inject(EstadoService);
  private cidadeService = inject(CidadeService);

  estados = [] as IEstado[];
  cidades = [] as ICidade[];
  itemMenusTabs: MenuItem[] = [
    { label: 'Cadastro', routerLink: `/proposta/cadastro`, skipLocationChange: false },
    { label: 'Pesquisa', routerLink: `/proposta/pesquisa`, skipLocationChange: false }
  ];
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
