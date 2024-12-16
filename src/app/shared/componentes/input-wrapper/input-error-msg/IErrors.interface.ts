

export interface ITipoErrorInput {
  tipoNome: string;
}

export interface IErrorInputMsgns {
  tipo: string;
  text: string;
  minlength?: string;
  maxlength?: string;
  pattern?: string;

}

export const defaultErrorInputMessages: IErrorInputMsgns[] = [
  { tipo: 'minlength', text: 'deve possuir no minínimo' },
  { tipo: 'maxlength', text: 'deve possuir no máximo' },
  { tipo: 'requiredOneOf', text: 'Preencha pelo menos um dos campos.' },
  { tipo: 'passwordStrength', text: 'deve conter pelo menos uma letra e um número.' },
  { tipo: 'passwordUnmatched', text: 'As senhas não coincidem.' },
  { tipo: 'invalidCPF', text: 'CPF inválido.' },
];
