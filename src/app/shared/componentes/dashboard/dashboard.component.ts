import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
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
import { DialogConfirmacaoComponent } from '../dialog-confirmacao/dialog-confirmacao.component';
import { ConfirmacaoService } from '../../util/confirmacao.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    PanelMenuModule,
    TooltipModule,
    RouterModule,
    DividerModule,
    ToastModule,
    RouterModule,
    DialogConfirmacaoComponent,
    PrimeHeaderComponent,
    PrimeSidebarComponent,
    PrimeFooterComponent],
  providers: [
    DatePipe,
    AsyncPipe,
    ConfirmationService,
    ConfirmacaoService,
    DialogService
  ],
})
export class DashBoardComponent implements OnInit {

  toastsService = inject(PrimeToastService);
  router = inject(Router);
  confirmacoesService = inject(ConfirmacaoService);
  private breakpointObserver = inject(BreakpointObserver);

  sidebarVisible = true;

  sideBarIconFlag = false;

  userInfos: any = {} as any;

  menus!: MenuItem[];


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );


  ngOnInit(): void {
    this.menus = environment.MENU_ITEMS_PROJETO_PILOTO;
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((result) => {
        this.sidebarVisible = !result.matches;
      });
  };

  protected deslogar(event: any) {
    if (event === false) { return }
    this.confirmacoesService.openGenerico('Deseja realmente Deslogar?').subscribe({
      next: (result) => {
        if (!result) { return this.toastsService.error('Você cancelou o Log-out!'); }
        this.toastsService.info('Deslogando...');
        sessionStorage.clear();
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 200);
      }
    });
  };

  toggleSideIconBar() {
    this.sideBarIconFlag = !this.sideBarIconFlag;
  };
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  };
}
