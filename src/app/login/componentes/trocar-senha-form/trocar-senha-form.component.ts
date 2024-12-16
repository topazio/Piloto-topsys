import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { PrimeToastService } from '../../../shared/util/prime-toast.service';
import { Router } from '@angular/router';
import { validationError } from '../../../shared/util/validationErrorFn';
import { CustomValidators } from '../../../shared/util/custom-validators.directive';
import { InputErrorMsgComponent } from "../../../shared/componentes/input-wrapper/input-error-msg/input-error-msg.component";

@Component({
  selector: 'app-trocar-senha-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    DividerModule,
    FloatLabelModule,
    InputErrorMsgComponent
],
  templateUrl: './trocar-senha-form.component.html',
  styleUrl: './trocar-senha-form.component.scss'
})
export class TrocarSenhaFormComponent {

  formGroup!: FormGroup;
  formBuilder = inject(FormBuilder);
  toastsService = inject(PrimeToastService);
  constructor(readonly router: Router) {
    this.formGroup = this.criarForm();
  };
  private criarForm(form?: any) {
    return this.formBuilder.group({
      login: [form?.login.trimEnd(), Validators.required],
      senha: [form?.senha.trimEnd(), Validators.compose([Validators.required, Validators.minLength(8)])],
      novasenha: [form?.novasenha.trimEnd(), Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.passwordValidator])],
      novasenhaconfirm: [form?.novasenhaconfirm, Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.passwordValidator])]
    }, { validators: CustomValidators.passwordMatcher() });
  };
  hasErrorFn: Function = validationError;
  protected salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.toastsService.success("Troca requisitada com sucesso!");
    } else {
      this.formGroup.updateValueAndValidity();
      this.toastsService.error('Preencha os campos inválidos/obrigatórios');
    }
  };
  protected resetFormulario() {
    this.formGroup.reset();
  };
}
