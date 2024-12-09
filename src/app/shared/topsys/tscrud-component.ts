
import { FormBuilder, FormGroup } from '@angular/forms';
import { TSCrudService } from './tscrud-service';
import { inject, Injectable, OnInit } from '@angular/core';
import { SnackBarService } from '../util/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TSCrudModel } from './tscrud-model';
import { DialogService } from '../util/dialog.service';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { ICliente } from '../../contratos/model/cliente';




@Injectable({
  providedIn: 'root'
})
export abstract class TSCrudComponent<T extends TSCrudModel> implements OnInit {
  items: T[] = [];

  model: T = {} as T;

  modelSubject = new Subject<T>();

  id = 0;

  formGroup: FormGroup;

  formBuilder = inject(FormBuilder);
  snackBarService = inject(SnackBarService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  dialogService = inject(DialogService);

  dataSource: Observable<T[]> = new Observable<T[]>();

  constructor() {
    this.formGroup = this.createForm();
  }

  abstract init(): void;

  abstract getServiceMain(): TSCrudService<T>;

  abstract createForm(form?: T): FormGroup;

  ngOnInit(): void {
    this.init();

    let id;

    this.route.paramMap.subscribe(params => {id = params.get('id')})

    if(id){
      this.detail(id);
    }


  }

  save(): void {
    if (this.formGroup.value.id !== null) {
      this.getServiceMain().update(this.formGroup.value).subscribe({
        next: () => this.messageSaveSuccess(),
      });
    } else {
      this.getServiceMain().insert(this.formGroup.value).subscribe({
        next: () => this.messageSaveSuccess(),
      });
    }
  }

  edit(path: string, id: number) {
    this.router.navigateByUrl(`${path}/edit/${id}`, {
      skipLocationChange: true,
    });
  }

  delete(id: number): void {
    this.dialogService
      .openDialogConfirmacaoExcluir()
      .subscribe((resposta: boolean) => {
        if (resposta) {
          this.getServiceMain().delete(id).subscribe({
            next: () => this.messageDeleteSuccess(),
          });
        }
      });
  }

  find(modelParam?: T){
    this.model = modelParam ? modelParam : this.formGroup.value;

    let list = this.getServiceMain().find(this.model);

    this.dataSource = list;

    return list;

  }


  detail(id: any): void {
    this.formGroup.value.id = id;

    this.getServiceMain().getById(id).subscribe((data) => this.modelSubject.next(data));

    this.modelSubject.subscribe((data) => {this.model = data; this.formGroup = this.createForm(data)});

  }

  messageSaveSuccess(): void {
    this.snackBarService.success('Salvo com sucesso!');
    this.resetForm();
  }

  messageDeleteSuccess(): void {
    this.snackBarService.success('Excluido com sucesso!');
    this.find(this.model);
  }

  resetForm(): void {
    this.formGroup.reset();
  }
}
