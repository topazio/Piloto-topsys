import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacaoExcluirComponent } from '../componentes/dialog-confirmacao-excluir/dialog-confirmacao-excluir.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialog = inject(MatDialog);

  openDialogConfirmacaoExcluir(){
    return this.dialog.open(DialogConfirmacaoExcluirComponent).afterClosed();
  }

}
