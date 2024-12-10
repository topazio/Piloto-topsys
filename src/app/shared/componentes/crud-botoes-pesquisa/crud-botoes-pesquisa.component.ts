import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-crud-botoes-pesquisa',
    imports: [MatButtonModule, MatCardModule],
    templateUrl: './crud-botoes-pesquisa.component.html',
    styleUrl: './crud-botoes-pesquisa.component.scss'
})
export class CrudBotoesPesquisaComponent {
  @Output() methodFind = new EventEmitter<any>();
  @Output() methodResetForm= new EventEmitter<any>();

  executeMethodFind(): void {
    this.methodFind.emit();
  }

  executeMethodResetForm(): void {
    this.methodResetForm.emit();
  }

}
