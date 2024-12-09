import { Component, Input } from '@angular/core';
import { MatTabNavPanel, MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crud-tab',
  standalone: true,
  imports: [MatTabsModule, RouterLink, MatTabNavPanel],
  templateUrl: './crud-tab.component.html',
  styleUrl: './crud-tab.component.scss'
})
export class CrudTabComponent {
  @Input() tabPanel!: string;
  @Input() routerLinkCadastro!: string;
  @Input() routerLinkPesquisa!: string;
  @Input() activeCadastro!: boolean;
  @Input() activePesquisa!: boolean;

}
