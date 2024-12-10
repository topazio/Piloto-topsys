import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { defaultErrorInputMessages } from './IErrors.interface';

@Component({
  selector: 'app-input-error-msg',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input-error-msg.component.html',
  styleUrl: './input-error-msg.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InputErrorMsgComponent {

  @Input() control?: AbstractControl | null = null;
  @Input() minLengthValidator: AbstractControl | null = null;
  @Input() fieldName = "";

  get errorInputMessage(): string | null {
    if(!this.control?.errors || !this.control?.touched) {
      return null;
    }
    const firstErrorInputKey = Object.keys(this.control.errors)[0];
    const errorMsgn = defaultErrorInputMessages.find(err => err.tipo === firstErrorInputKey);
    switch (errorMsgn?.tipo) {
      case 'minlength':
        errorMsgn.text = `${this.fieldName} deve possuir no minínimo ${this.control.errors['minlength'].requiredLength} caracteres`;
        return errorMsgn.text;
      case 'maxlength':
        errorMsgn.text = `${this.fieldName} deve possuir no máximo ${this.control.errors['maxlength'].requiredLength} caracteres`;
        return errorMsgn.text;
      case 'requiredOneOf':
        errorMsgn.text = `Preencha pelo menos um dos campos.`;
        return errorMsgn.text;
      case 'passwordStrength':
        errorMsgn.text = `A senha precisa conter pelo menos uma letra e um número.`;
        return errorMsgn.text;
      case 'passwordUnmatched':
        errorMsgn.text = `As senhas não coincidem.`;
        return errorMsgn.text;
      default:
        return null;
    }
  };
}
