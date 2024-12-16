import { Component, inject, Input } from '@angular/core';
import { LoginFuncaoFormComponent } from '../login-funcao-form/login-funcao-form.component';
import { PrimeToastService } from '../../../shared/util/prime-toast.service';
import { formatCPF, validationError } from '../../../shared/util/validationErrorFn';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/util/custom-validators.directive';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputErrorMsgComponent } from "../../../shared/componentes/input-wrapper/input-error-msg/input-error-msg.component";
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    DynamicDialogModule,
    ButtonModule,
    FloatLabelModule,
    InputMaskModule,
    CheckboxModule,
    InputNumberModule,
    InputErrorMsgComponent
],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Input() origemId?: any;
  certificadoDigitalFlag = false;
  formGroup!: FormGroup;
  formGroupCertificadoDigital!: FormGroup;
  formBuilder = inject(FormBuilder);
  toastsService = inject(PrimeToastService);
  /* authService = inject(UserLoginService); */
  hasErrorFn: Function = validationError;
  ref: DynamicDialogRef | undefined;
  constructor(readonly router: Router, public dialogService: DialogService) { this.formGroup = this.criarForm(); this.formGroupCertificadoDigital = this.criarFormCertificadoDigital(); };

  private criarFormCertificadoDigital(form?: any) {
    return this.formBuilder.group({
      cpfCertificadoDigital: [form?.certificadoDigital.trimEnd(), [Validators.required, Validators.minLength(11), CustomValidators.cpfValidator]],
    });
  };
  private criarForm(form?: any) {
    return this.formBuilder.group({
      login: [form?.login.trimEnd(), Validators.required],
      senha: [form?.senha.trimEnd(), Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  };


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected showFormDialog(userId: number, userToken: string, origemId?: number) {
    this.ref = this.dialogService.open(LoginFuncaoFormComponent, {
      header: 'Login Setor/Função',
      width: '70vw',
      maximizable: true,
      focusOnShow: false,
      contentStyle: { overflow: 'auto' },
      data: { userId, origemId: this.origemId ?? null, userToken } // Passar o id para o componente
    });

    this.ref.onClose.subscribe((data: any) => {
      if (!data.error) {
        console.log('Form data:', data);
      }
      this.toastsService.error(data.error);
    });
  };
  protected salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
    /*  this.authService.loginUser(this.formGroup.value).subscribe(res => {
        sessionStorage.setItem('token', res?.token);
        this.toastsService.success("Usuário aceito!");
        this.showFormDialog(res?.id, res?.token, this.origemId ?? null);
        setTimeout(() => {
          this.toastsService.info('Escolha a Função e Setor desejados:')
        }, 200)
        /*    this.router.navigateByUrl('/dash/home')
      }) */
    } else {
      this.formGroup.updateValueAndValidity();
      this.toastsService.error('Preencha os campos inválidos/obrigatórios');
    }
  };
  resetFormulario() {
    this.formGroup.reset();
  };
}
