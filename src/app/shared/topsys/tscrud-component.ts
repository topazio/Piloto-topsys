
import { FormBuilder, FormGroup } from '@angular/forms';
import { TSCrudService } from './tscrud-service';
import { Component, inject, Injectable, OnDestroy, OnInit, Type } from '@angular/core';
import { PrimeToastService } from '../util/prime-toast.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { TSCrudModel } from './tscrud-model';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { ConfirmacaoService } from '../util/confirmacao.service';
import { validationError } from '../util/validationErrorFn';
import { RouterNavigatorService } from '../util/router-navigator.service';
import { SessionManagerService } from '../util/session-manager.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef
} from 'primeng/dynamicdialog';
import { ITSPage } from './tspage.interface';
import { CrudDialogsBotoesCadastroComponent } from '../componentes/crud-dialogs-botoes-cadastro/crud-dialogs-botoes-cadastro.component';
@Injectable()
export abstract class TSCrudComponent<T extends TSCrudModel, Y = undefined> implements OnInit, OnDestroy {

  model: T = {} as T;
  id = 0;

  formGroup: FormGroup;

  hasError: Function = validationError;
  ref?: DynamicDialogRef | undefined;
  confirmationService = inject(ConfirmacaoService);
  formBuilder = inject(FormBuilder);
  snackBarService = inject(PrimeToastService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  routerHistoryService = inject(RouterNavigatorService);
  sessionManagerService = inject(SessionManagerService);
  dialogDinamicoService = inject(DialogService);
  configDialogService = inject(DynamicDialogConfig);

  items: Observable<T[]> = new Observable<T[]>();


  cachePage: boolean = false;

  constructor() {
    this.formGroup = this.createForm();
  }

  abstract init(): void;

  abstract getServiceMain(): TSCrudService<T>;

  abstract createForm(form?: T): FormGroup;

  ngOnInit(): void {
    this.init();

    this.historicNavigation();

    this.sessionManagerService.removerFiltros(this.route);

    this.resetForm();

    this.checkCacheFlag();

    this.checkIdParam();
    this.checkIdConfigDialog();
  };
  ngOnDestroy(): void {
    if (this.cachePage) {
      this.sessionManagerService.incluirFiltros(this.formGroup);
    }
    if (this.ref) {
      this.ref.close();
    }
  };

  save(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.formGroup.value.id !== null) {
        this.getServiceMain().update(this.formGroup.value).subscribe({
          next: () => this.messageSaveSuccess(),
        });
      } else {
        this.getServiceMain().insert(this.formGroup.value).subscribe({
          next: () => this.messageSaveSuccess(),
        });
      }
    } else {
      this.snackBarService.error('Preencha os campos inválidos/obrigatórios');
    }
  };

  edit(path: string, id: number | string) {
    this.router.navigateByUrl(`dash/${path}/cadastro/${id}`, {
      skipLocationChange: true,
    });
  };

  openDialogEdit(id: number | string | null,
    component: Type<unknown>,
    footerCompoonent?: Type<unknown>,
    headerDialog?: string) {
    return this.dialogDinamicoService.open(component,
      {
        header: headerDialog ?? 'Edição',
        width: '70vw',
        maximizable: true,
        modal: true,
        focusOnShow: false,
        contentStyle: { overflow: 'auto', minHeight: '40vh', height: '100%' },
        data: {
          id,
        },
        templates: {
          footer: footerCompoonent ?? undefined,
        }

      }
    )
  };

  delete(id: number): void {
    this.confirmationService.openDialogConfirmacaoExcluir().subscribe({
      next: (value) => {
        if (value) {
          this.getServiceMain().delete(id).subscribe({
            next: () => this.messageDeleteSuccess(),
          });
        }
      },
    })
  };

  find(modelParam?: T, pageIndex?: number) {

    this.model = modelParam ?? this.formGroup.value;

    this.model.pageIndex = pageIndex ?? undefined;

    this.items = this.getServiceMain().find(this.model);

    return this.items;

  }
  changePage(eventPage: ITSPage) {

    this.find(this.model, eventPage.page);

  }

  //METODO LAZY LOAD PARA DB JSON SERVER:
  changePageDBJson(event: ITSPage) {

    this.getServiceMain().changePageDBJson(undefined, undefined, event.page).subscribe(listaPagina => {
      this.items = new Observable<T[]>(observer => {
        observer.next(listaPagina.data as T[]);
        observer.complete();
      });
    });

  }
  async detail(id: any): Promise<void> {


    this.formGroup.value.id = id;

    this.model = await firstValueFrom(this.getServiceMain().getById(id)); //.subscribe((data) => this.modelSubject.next(data));

    this.formGroup = this.createForm(this.model);

    //this.modelSubject.subscribe((data) => {this.model = data; this.formGroup = this.createForm(data)});

  }
  findChildrenDetail(id: number): Observable<Y[]> {

    throw new Error('Method not implemented.');
  }

  messageSaveSuccess(): void {
    this.snackBarService.success('Salvo com sucesso!');
  }

  messageDeleteSuccess(): void {
    this.snackBarService.success('Excluido com sucesso!');
    this.find(this.model);
  }

  resetForm(): void {
    this.formGroup.reset();
  }
  private checkIdConfigDialog() {
    let id = this.configDialogService?.data?.id ?? null;
    if (id) {
      this.detail(id);
    }
  }
  private checkIdParam() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.detail(id);
    }
  };
  private checkCacheFlag() {
    if (this.cachePage) {

      let form = this.sessionManagerService.getFiltros();

      if (form) {

        this.formGroup.patchValue(JSON.parse(form));

      }

    }
  }
  private historicNavigation() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      if (this.route.snapshot?.parent?.url[0].path) {
        this.routerHistoryService.setLastRoute(this.route.snapshot?.parent?.url[0].path);
      }
    });
  }
}
