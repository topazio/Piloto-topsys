import { Component, inject, OnInit } from '@angular/core';
import { FuncaoFormButtonComponent } from './funcao-form-button/funcao-form-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { take } from 'rxjs';
import { validationError } from '../../../shared/util/validationErrorFn';
import { PrimeToastService } from '../../../shared/util/prime-toast.service';

@Component({
  selector: 'app-login-funcao-form',
  standalone: true,
  imports: [
    FuncaoFormButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    FieldsetModule,
    DynamicDialogModule,
    DropdownModule,
    TableModule,
    SplitterModule,
    CheckboxModule,
    FuncaoFormButtonComponent,
    DividerModule,
    ScrollPanelModule,
    ProgressSpinnerModule
  ],
  templateUrl: './login-funcao-form.component.html',
  styleUrl: './login-funcao-form.component.scss',
  providers: [DialogService]
})
export class LoginFuncaoFormComponent implements OnInit {
  constructor(public dialogService: DialogService, public ref: DynamicDialogRef) {
    this.formGroupFuncao = this.criarFormLoginFuncao();
  }
/*   userAuthedLogin = inject(UsuarioAuthService);
  userLoginServices = inject(UserLoginService) */;
  config = inject(DynamicDialogConfig);
  toastServices = inject(PrimeToastService);
  fb = inject(FormBuilder);
  formGroupFuncao!: FormGroup;
  hasErrorFn: Function = validationError;
  funcaoSelecionada: any;
  setorProp: any = {} as any;
  selecetedSetor = '';
  userInfos$: any;
  userFuncoes: any[] = [];
  userSetores: any[] = [];
  userOrigems: any[] = [];
  userOrganizacoes: any[] = [];
  private criarFormLoginFuncao(form?: any): FormGroup {
    return this.fb.group({
      funcaoModel: [form?.funcaoModel ?? null, Validators.required],
      setorModel: [form?.setorModel ?? null, Validators.required],
      organizacaoModel: [form?.organizacaoModel ?? null, Validators.required],
      origemModel: [form?.origemModel ?? null],
    });
  };
  handleClickSetter(event: { id: number, funcao: any }) {
    console.log(event);
    this.formGroupFuncao.controls['funcaoModel'].setValue(event.id);
    this.formGroupFuncao.get('funcaoModel')?.markAsTouched()

  }
  selectSetor(setor: any) {
    this.formGroupFuncao.get('setorModel')?.setValue(setor.id);
    this.selecetedSetor = setor.descricao;
    this.setorProp = setor;
    this.formGroupFuncao.get('setorModel')?.markAsTouched();

  }
  getUserFuncoes() {
    setTimeout(() => {

      const userId = this.config.data?.userId ?? this.userInfos$?.id;
      if (!userId) {
        /* this.ref?.close({ error: 'Erro ao obter os dados do Usuário, tente novamente.' }); */

      }
      /*  return this.userLoginServices.getUserFuncoes().pipe(take(1)).subscribe(
         {
           next: (res) => {
             this.userFuncoes = res;
           },
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
           error: (err) => {
             this.ref?.onClose.pipe(take(1)).subscribe();
           }
         }
       ); */
    }, 1000);
  };
  getUserOrigems() {
    const origemId = this.config.data?.origemId ?? null; if (!origemId) { return; }
    else {
      setTimeout(() => {

        const userId = this.config.data?.userId ?? this.userInfos$?.id;

        if (!userId) {
          /* this.ref?.close({ error: 'Erro ao obter os dados do Usuário, tente novamente.' }); */
        }
        /*  this.userLoginServices.getUserOrigems().pipe(take(1)).subscribe(
           {
             next: (res) => {
               this.userOrigems = res;
             },
             // eslint-disable-next-line @typescript-eslint/no-unused-vars
             error: (err) => {
               this.ref?.onClose.pipe(take(1)).subscribe();
             }
           }
         ); */
      }, 1000);
    }
  };
  getUserSetores() {
    setTimeout(() => {
      const userId = this.config.data?.userId ?? this.userInfos$?.id;
      if (!userId) {
        /* this.ref?.close({ error: 'Erro ao obter os dados do Usuário, tente novamente.' }); */
        this.ref?.onClose.pipe(take(1)).subscribe();
      }
      /* return this.userLoginServices.getUserSetores().pipe(take(1)).subscribe(
           {
             next: (res) => {
               this.userSetores = res;
             },
             // eslint-disable-next-line @typescript-eslint/no-unused-vars
             error: (err) => {
               this.ref?.onClose.pipe(take(1)).subscribe();
             }
           }
         );  */
    }, 1000);
  };
  ngOnInit() {
    /* this.dialogService.getInstance().close() */
    /*  this.userAuthedLogin.setUserInfo(); */
    /*   setTimeout(() => {
        this.config.data.userInfos = this.userAuthedLogin.getUserInfos();
        this.config.data.userId = this.userAuthedLogin.getUserId()
      }, 800); */
    this.getUserFuncoes();
    this.getUserSetores();

  }

}
