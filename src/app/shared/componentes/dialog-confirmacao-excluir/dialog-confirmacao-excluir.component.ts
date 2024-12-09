import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmacao-excluir',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-confirmacao-excluir.component.html',
  styleUrl: './dialog-confirmacao-excluir.component.scss'
})
export class DialogConfirmacaoExcluirComponent {


}
