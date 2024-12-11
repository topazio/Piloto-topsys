import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PrimeToastService } from '../../util/prime-toast.service';
import { ConfirmacaoService } from '../../util/confirmacao.service';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-dialog-confirmacao',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, DividerModule, ButtonModule],
  providers: [ConfirmacaoService, MessageService],
  templateUrl: './dialog-confirmacao.component.html',
  styleUrl: './dialog-confirmacao.component.scss',

})
export class DialogConfirmacaoComponent {
  confirmationService = inject(ConfirmationService);
  constructor(
    private messageService: PrimeToastService,
    private confirmacaoService: ConfirmacaoService) { }

  logger() {
    return console.log("Aceitou");
  }
  loggerReject() {
    return console.log('Rejeitou');
  }

  confirm1() {
   /*  this.confirmacaoService.openDialogConfirmacaoExcluir().subscribe({
      next: (value) => {
        if(!value){ return }
        this.messageService.success('Você aceitou');

      },
    })
 */
    /* .accept.subscribe({
      next: (value) => {
        console.log(value)
        this.messageService.success('Você aceitou');
        this.confirmacaoService.openDialogConfirmacaoExcluir().close();
      },
    }) */
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.messageService.success('You have accepted');
      },
      reject: () => {
        this.messageService.error('You have rejected');
      }
    });
  }
}
