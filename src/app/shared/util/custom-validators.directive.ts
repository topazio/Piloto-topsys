
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    const valid = hasNumber && hasLetter;
    return !valid ? { passwordStrength: 'A senha precisa conter pelo menos uma letra e um numero.' } : null;
  }
  static passwordMatcher(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('novasenha')?.value;
      const confirmPassword = group.get('novasenhaconfirm')?.value;
      return password === confirmPassword ? null : { passwordUnmatched: 'As senhas não coincidem.' };
    };
  }
  static integerValidator(control: FormControl) {
    const val = Number(control.value);
    return isNaN(val) || parseInt(control.value) != val ? { 'notInteger': true } : null;
  }

  static numberValidator(control: FormControl) {
    const val = Number(control.value);
    return isNaN(val) ? { 'notNumber': true } : null;
  }
  static convertStringToDate(control: FormControl) {
    const date = new Date(control.value);
    return isNaN(date.getTime()) ? { 'invalidDate': true } : null;
  }
  static cpfValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const valid = validaCPF(value);
    return !valid ? { invalidCPF: 'CPF inválido.' } : null;
  }
};

function validaCPF(cpf: string): boolean {
  let Soma = 0;
  let Resto;

  const strCPF = String(cpf).replace(/[^\d]/g, '');

  if (strCPF.length !== 11) return false;

  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ].indexOf(strCPF) !== -1) return false;

  for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;

  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;

  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;

  if (Resto != parseInt(strCPF.substring(10, 11))) return false;

  return true;
};
