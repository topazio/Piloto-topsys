import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crud-botoes-pesquisa',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './crud-botoes-pesquisa.component.html',
  styleUrl: './crud-botoes-pesquisa.component.scss'
})
export class CrudBotoesPesquisaComponent {

  @Output() methodFind = new EventEmitter<any>();
  @Input() buttonNovoCadastroFlag: boolean = false;
  @Input() buttonNovoCadastroLabel: string = 'Novo Cadastro';
  @Output() methodResetForm = new EventEmitter<any>();
  @Output() methodOpenDialog = new EventEmitter<any>();
  executeMethodOpenDialog(): void {
    this.methodOpenDialog.emit();
  }

  executeMethodFind(): void {
    this.methodFind.emit();
  }

  executeMethodResetForm(): void {
    this.methodResetForm.emit();
  }

}
