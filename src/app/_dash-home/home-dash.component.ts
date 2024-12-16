import { Component } from '@angular/core';
import { DashBoardComponent } from '../shared/componentes/dashboard/dashboard.component';

import { ConfirmacaoService } from '../shared/util/confirmacao.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'home-dash',
  standalone: true,
  imports: [
    DashBoardComponent,
  ],
  template: `<app-dashboard />`,
  providers:[ConfirmacaoService, DynamicDialogConfig]
})
export class HomeDashComponent {

}
