
import { FormBuilder, FormGroup } from '@angular/forms';
import { TSCrudService } from './tscrud-service';
import { inject, Injectable, OnInit } from '@angular/core';
import { PrimeToastService } from '../util/prime-toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TSCrudModel } from './tscrud-model';
import { firstValueFrom, Observable } from 'rxjs';
import { ConfirmacaoService } from '../util/confirmacao.service';
import { validationError } from '../util/validationErrorFn';

@Injectable()
export abstract class TSCrudComponent<T extends TSCrudModel> implements OnInit {

  model: T = {} as T;

  id = 0;

  formGroup: FormGroup;




  hasError: Function = validationError;
  confirmationService = inject(ConfirmacaoService);
  formBuilder = inject(FormBuilder);
  snackBarService = inject(PrimeToastService);
  route = inject(ActivatedRoute);
  router = inject(Router);

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

    if(this.cachePage){
      let form;
     form = sessionStorage.getItem('filtros');
   /*  this.formGroup = form */
    }

    this.resetForm();

    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.detail(id);
    }


  }

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
  }

  edit(path: string, id: number | string) {
    this.router.navigateByUrl(`${path}/cadastro/${id}`, {
      skipLocationChange: true,
    });
  }

  delete(id: number): void {
    this.confirmationService.openDialogConfirmacaoExcluir().subscribe({
      next: (value) => {

        if(value){
          this.getServiceMain().delete(id).subscribe({
            next: () => this.messageDeleteSuccess(),
          });
        }
      },
    })
  }

  find(modelParam?: T) {
    this.model = modelParam ?? this.formGroup.value;

    this.items = this.getServiceMain().find(this.model);

    return this.items;

  }


  async detail(id: any): Promise<void> {


    this.formGroup.value.id = id;

    this.model = await firstValueFrom(this.getServiceMain().getById(id)); //.subscribe((data) => this.modelSubject.next(data));

    this.formGroup = this.createForm(this.model);

    //this.modelSubject.subscribe((data) => {this.model = data; this.formGroup = this.createForm(data)});

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
}
