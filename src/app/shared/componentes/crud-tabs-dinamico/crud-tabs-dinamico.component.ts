import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-crud-tabs-dinamico',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabMenuModule,
    ProgressSpinnerModule,
    ButtonModule
  ],
  templateUrl: './crud-tabs-dinamico.component.html',
  styleUrl: './crud-tabs-dinamico.component.scss'
})
export class CrudTabsDinamicoComponent implements OnInit {
  @Input() tabsDinamicas: MenuItem[] = [];
  @Input() routerLinkRelativo!: string;
  route = inject(ActivatedRoute);

  itemsMenus: MenuItem[] = [];
  ngOnInit(): void {

    this.itemsMenus = this.tabsDinamicas;
  }
}
