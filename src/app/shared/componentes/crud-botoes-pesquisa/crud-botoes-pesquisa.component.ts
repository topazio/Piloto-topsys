import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() methodResetForm = new EventEmitter<any>();

  executeMethodFind(): void {
    this.methodFind.emit();
  }

  executeMethodResetForm(): void {
    this.methodResetForm.emit();
  }

}
