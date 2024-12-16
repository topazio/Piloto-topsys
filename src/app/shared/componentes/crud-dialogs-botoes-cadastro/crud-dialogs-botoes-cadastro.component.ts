import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-crud-dialogs-botoes-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule],
  templateUrl: './crud-dialogs-botoes-cadastro.component.html',
  styleUrl: './crud-dialogs-botoes-cadastro.component.scss'
})
export class CrudDialogsBotoesCadastroComponent {

  @Output() methodSave = new EventEmitter<any>();

  @Output() methodResetForm = new EventEmitter<any>();

  @Input() telaRota: string = '';

  executeMethodSave() {

    this.methodSave.emit();

  }

  executeMethodResetForm(): void {
    this.methodResetForm.emit();
  }
}
