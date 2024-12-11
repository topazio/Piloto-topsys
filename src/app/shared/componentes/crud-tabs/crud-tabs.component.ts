import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-crud-tabs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabMenuModule,
    ProgressSpinnerModule,
    ButtonModule
  ],
  templateUrl: './crud-tabs.component.html',
  styleUrl: './crud-tabs.component.scss'
})
export class CrudTabsComponent implements OnInit {

  @Input() routerLinkRelativo!: string;
  route = inject(ActivatedRoute);

  itemsMenus: MenuItem[] = [];
  ngOnInit(): void {
    this.itemsMenus = [
      { label: 'Cadastro', routerLink: `/${this.routerLinkRelativo}/cadastro` },
      { label: 'Pesquisa', routerLink: `/${this.routerLinkRelativo}/pesquisa` }
    ];
  }
}
