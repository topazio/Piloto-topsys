import { AbstractControl } from "@angular/forms";

export function validationError(control: AbstractControl): string {
  if (control?.errors && control?.touched) {
    return 'ng-invalid ng-dirty';
  }
  return "";
}


export function stringConvertToDate(value: any) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (value.length < 8) {
    return value;
  }
  if (value.length === 8) {
    const parsedValue = value.at(0) + value.at(1) + '/' + value.at(2) + value.at(3) + '/' + value.at(4) + value.at(5) + value.at(6) + value.at(7);
    return parsedValue;
  }
  return value;

}

export function stringToDate(value: string): Date {
  value = value.replaceAll('/', '-');

  return new Date(value);
}

export function formatCNPJ(cnpjString: string) {
  const cleanedString = cnpjString.replace(/\D/g, '');
  const formattedCNPJ = cleanedString.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );

  return formattedCNPJ;
};
export function formatCPF(cpfString: string): string {
  const cleanedString = cpfString.replace(/\D/g, '');
  const formattedCPF = cleanedString.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4'
  );
  return formattedCPF;
}

export function formatIdentifier(identificador: any, identificadorModel: { id: number }): string {
  if (identificadorModel.id === 1) {
    return formatCNPJ(identificador);
  } else if (identificadorModel.id === 2) {
    return formatCPF(identificador);
  } else {
    return identificador;
  }
}

export function validaCPF(cpf: string): boolean {
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
}
