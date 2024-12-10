import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { PrimeToastService } from '../../util/prime-toast.service';
import { PrimeFooterComponent } from "./prime-footer/prime-footer.component";
import { PrimeHeaderComponent } from './prime-header/prime-header.component';
import { PrimeSidebarComponent } from './prime-sidebar/prime-sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [CommonModule,
    MenubarModule,
    ButtonModule,
    PanelMenuModule,
    TooltipModule,
    RouterModule,
    ConfirmDialogModule,
    DividerModule,
    ToastModule,
    RouterModule,
    PrimeHeaderComponent,
    PrimeSidebarComponent,
    PrimeFooterComponent],
    providers: [DatePipe, ConfirmationService, AsyncPipe],
})
export class DashBoardComponent implements OnInit {

  confirmationService = inject(ConfirmationService);
  toastsService = inject(PrimeToastService);
  private breakpointObserver = inject(BreakpointObserver);
  sidebarVisible = true;
  userInfos: any = {} as any;
  menus!: MenuItem[];
  router = inject(Router);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );
  sideBarIconFlag = false;
  ngOnInit(): void {
    this.menus = environment.MENU_ITEMS_CME;
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((result) => {
        this.sidebarVisible = !result.matches;
      });
  };

  deslogar(event: any) {
    if (event === false) { return }
    this.confirmationService.confirm({
      header: 'Deseja realmente Deslogar?',
      message: '',
      accept: () => {
        this.toastsService.info('Deslogando...');
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
      },
      reject: () => {
        this.toastsService.error('Você cancelou o Log-out!');
      },
    });
  };
  toggleSideIconBar() {
    this.sideBarIconFlag = !this.sideBarIconFlag;
  };
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  };
}
