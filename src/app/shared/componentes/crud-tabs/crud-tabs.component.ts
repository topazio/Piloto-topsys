import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-crud-tabs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabMenuModule,
    ScrollPanelModule,
    ProgressSpinnerModule,
    TabViewModule,
    ButtonModule
  ],
  templateUrl: './crud-tabs.component.html',
  styleUrl: './crud-tabs.component.scss'
})
export class CrudTabsComponent {

  @Output() activeTabIndexChanged = new EventEmitter<number>();

  @Input() activeTabIndex = 0;

  @Input() tabsFor: any[] = [];

  @Input() buttonNovoCadastroFlag: boolean = false;

  @Input() telaRota!: string;

  constructor(public route: ActivatedRoute, public router: Router) { };
  onTabChange(event: any) {

    this.activeTabIndex = event.index;
    console.log(this.route.params);
    this.activeTabIndexChanged.emit(this.activeTabIndex);

  };

}
