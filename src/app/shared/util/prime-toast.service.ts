import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PrimeToastService {

  constructor(readonly messageService: MessageService) { };
  show(message?: string, severity?: string, header?: string, life = 5000) {

    setTimeout(() => this.messageService.clear('toastSimples'), life);

    this.messageService.add({key: 'toastSimples', severity, summary: header ?? undefined, detail: message, life });

  };

  success(message: string, header?: string) {

    this.show(message, 'success', header ?? undefined);

  };

  error(message: string) {

    this.show(message, 'error');

  };

  info(message: string) {

    this.show(message, 'info');

  };

  clear() {

    this.messageService.clear('toastSimples');

  };
}

