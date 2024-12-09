import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crud-botoes-cadastro',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './crud-botoes-cadastro.component.html',
  styleUrl: './crud-botoes-cadastro.component.scss',
})
export class CrudBotoesCadastroComponent {
  @Output() methodSave = new EventEmitter<any>();
  @Output() methodResetForm = new EventEmitter<any>();
  @Input() formGroup!: FormGroup;


  executeMethodSave(): void {
    this.methodSave.emit();
  }

  executeMethodResetForm(): void {
    this.methodResetForm.emit();
  }

}
