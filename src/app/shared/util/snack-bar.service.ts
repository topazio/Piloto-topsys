
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
   private snackBar = inject(MatSnackBar);

  success(mensagem: string, duracao: number = 5000) {
    this.snackBar.open(mensagem, 'close', {
      duration: duracao,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  error(mensagem: string, duracao: number = 5000) {
    this.snackBar.open(mensagem, 'close', {
      duration: duracao,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  info(mensagem: string, duracao: number = 5000) {
    this.snackBar.open(mensagem, 'close', {
      duration: duracao,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
    });
  }
}
