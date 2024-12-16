import { Component, inject, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute, Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, map, shareReplay, take, switchMap, of, catchError } from 'rxjs';
import { PrimeToastService } from '../shared/util/prime-toast.service';
import { OrigemsService } from './services/origems.service';
import { LoginFormComponent } from "./componentes/login-form/login-form.component";
import { TrocarSenhaFormComponent } from "./componentes/trocar-senha-form/trocar-senha-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    SplitterModule,
    ImageModule,
    TabViewModule,
    LoginFormComponent,
    TrocarSenhaFormComponent
],
  providers: [DialogService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(readonly route: ActivatedRoute, readonly router: Router) { }
  origensServices = inject(OrigemsService);
  toastServices = inject(PrimeToastService);
  imgOrigem: any = { alt: 'Imagem de fundo', src: '/assets/logoColored.png' };
  origemUrl = "smpep";
  origemInfo: any = { id: 0, nome: '', apelido: '', imagemUrl: '' };
  activeTabIndex = 0;
  littleScreen: { class: string | null, flag: boolean, panelSizer: any[] | null, minPanelSize: any[] | null } = { class: null, flag: false, panelSizer: null, minPanelSize: null };
  origemParam$ = new BehaviorSubject<string | null>(this.origemUrl);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result: any) => result.matches),
    shareReplay()
  );

  // PEGAR PARAM DO QUERY DE ROTA DA ORIGEM
  private checkOrigemParam() {
    this.route.queryParamMap.pipe(
      take(1),  //TAKE PARA UNSUBSCRIBE
      switchMap((params) => {
        const origemParam = params.get('origem');
        if (!origemParam) {
          this.toastServices.error('Erro ao obter a origem da unidade.');
          this.origemInfo = { id: -1, nome: '', apelido: '', imagemUrl: '' };   // ID: -1 SIGNIFICA QUE NÃO EXISTE NO ENUM/LISTA CASO TENHA QUE INCLUIR;
          this.router.navigate([], { queryParams: {}, replaceUrl: true });
          return of(null);
        }
        this.origemParam$.next(origemParam);
        return this.origemParam$;
      }),
      switchMap((apelido) => this.getOrigemInfo(apelido)),
      catchError(() => {
        this.router.navigate([], { queryParams: {}, replaceUrl: true });
        return of(null);
      })
    ).subscribe();
  };
  private getOrigemInfo(apelido: string | null) {
    return this.origensServices.getImgOrigem(apelido).pipe(
      take(1),
      catchError(() => {
        this.toastServices.error('Erro ao obter a imagem de origem.');
        return of([]);
      }),
      switchMap((data) => {
        if (data.length !== 0) {
          this.origemInfo = data[0];   //data[0] é porque o json server me devolver uma resposta em uma array sempre
        } else {
          this.router.navigate([], { queryParams: {}, replaceUrl: true });
        }
        return of(data);
      })
    );
  };
  ngOnInit(): void {
    this.checkOrigemParam();
    // OBSERVADOR DE BREAKPOINTS DOS PANELS SPLITTERS;
    this.breakpointObserver.observe(['(max-width: 798px)']).subscribe(result => {
      if (result.matches) {
        this.littleScreen = {
          class: 'max798px',
          flag: true,
          panelSizer: [65, 35],
          minPanelSize: [65, 35],
        }
      }
      else {
        this.littleScreen = {
          class: '',
          flag: false,
          panelSizer: null,
          minPanelSize: null,
        }
      }

    });
    this.breakpointObserver.observe(['(max-width: 1820px)']).subscribe(result => {
      if (result.matches) {
        this.littleScreen = {
          class: 'above799px',
          flag: true,
          panelSizer: [45, 55],
          minPanelSize: [55],
        }
      } else {
        this.littleScreen = {
          class: '',
          flag: false,
          panelSizer: null,
          minPanelSize: null,
        }
      }

    });

  };

}
