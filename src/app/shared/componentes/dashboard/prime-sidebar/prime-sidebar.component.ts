import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-prime-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    PanelMenuModule
  ],
  templateUrl: './prime-sidebar.component.html',
  styleUrl: './prime-sidebar.component.scss'
})
export class PrimeSidebarComponent implements OnInit {

  @Input() sideBarIconOnly = false;

  @Input() items: MenuItem[] = [];
  ngOnInit(): void {
  //notvoid
  }
}
