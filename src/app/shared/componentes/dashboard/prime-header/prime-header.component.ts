import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PrimeToastService } from '../../../util/prime-toast.service';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-prime-header',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    DividerModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './prime-header.component.html',
  styleUrl: './prime-header.component.scss',
  providers: [ConfirmationService],
})
export class PrimeHeaderComponent {
  @Output() logUserOut = new EventEmitter<boolean>()
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() sideBarIconToggle = new EventEmitter<boolean>();
  @Input() textoHeaderWhite = 'SM';
  @Input() textHeaderPrimary = 'PEP';
  items: MenuItem[] | undefined;
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  toastsService = inject(PrimeToastService);
  flagIconsSwitch = false;
  toggleIconSwitch() {
    this.sideBarIconToggle.emit(this.flagIconsSwitch);
  }
  toggleSidebar() {
    this.sidebarToggle.emit();
  }
  logOut() {
    this.logUserOut.emit(true);
  }
}
