import { Component } from '@angular/core';
import { DashBoardComponent } from '../shared/componentes/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmacaoService } from '../shared/util/confirmacao.service';

@Component({
  selector: 'home-dash',
  standalone: true,
  imports: [
    RouterModule,
    DashBoardComponent,
    CommonModule
  ],
  template: `<app-dashboard />`,
  providers:[ConfirmacaoService]
})
export class HomeDashComponent {

}
