import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crud-botoes-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ],
  templateUrl: './crud-botoes-cadastro.component.html',
  styleUrl: './crud-botoes-cadastro.component.scss',
})
export class CrudBotoesCadastroComponent {

  @Output() methodSave = new EventEmitter<any>();

  @Output() methodResetForm = new EventEmitter<any>();

  @Input() telaRota: string = '';

  constructor(public router: Router) { };

  executeMethodSave(): void {
    this.methodSave.emit();
  }
  async redirecionarParaNovoCadastro() {
    await this.router.navigate([`/${this.telaRota}/cadastro`], {
      replaceUrl: true,
    });
  }
  executeMethodResetForm(): void {

    this.redirecionarParaNovoCadastro();

    this.methodResetForm.emit();
  }

}
