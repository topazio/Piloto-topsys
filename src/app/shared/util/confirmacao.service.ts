import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoService {

  confirmationServices = inject(ConfirmationService);


  openGenerico(messagem?: string, header: string = 'Confirmação'): Observable<boolean | null> {
    return new Observable<boolean | null>(observerDialog => {
      this.confirmationServices.confirm({
        key: 'confirmacaoDialog',
        message: messagem ?? 'Confirme a ação',
        header: 'Confirmação',
        accept: () => {
          observerDialog.next(true);
          observerDialog.complete();
        },
        reject: () => {
          observerDialog.next(null);
          observerDialog.complete();
        }
      });
    });
  }
  openDialogConfirmacaoExcluir(): Observable<boolean | null> {
    return new Observable<boolean | null>(observerDialog => {
      this.confirmationServices.confirm({
        key: 'confirmacaoDialog',
        message: 'Você deseja excluir?',
        header: 'Confirmação',
        accept: () => {
          observerDialog.next(true);
          observerDialog.complete();
        },
        reject: () => {
          observerDialog.next(null);
          observerDialog.complete();
        }
      });
    });
  }
  openDialogConfirmacaoEdicao(): Observable<boolean | null> {
    return new Observable<boolean | null>(observerDialog => {
      this.confirmationServices.confirm({
        key: 'confirmacaoDialog',
        message: 'Você deseja alterar o registro?',
        header: 'Confirmação',
        accept: () => {
          observerDialog.next(true);
          observerDialog.complete();
        },
        reject: () => {
          observerDialog.next(null);
          observerDialog.complete();
        }
      });
    });
  }
}
