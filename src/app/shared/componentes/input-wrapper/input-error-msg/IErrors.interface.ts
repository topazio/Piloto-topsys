

export interface ITipoErrorInput {
  tipoNome: string;
}

export interface IErrorInputMsgns {
  tipo: string;
  text: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;

}

export const defaultErrorInputMessages: IErrorInputMsgns[] = [
  { tipo: 'minlength', text: 'deve possuir no minínimo' },
  { tipo: 'maxLength', text: 'deve possuir no máximo' },
  { tipo: 'requiredOneOf', text: 'Preencha pelo menos um dos campos.' },
  { tipo: 'passwordStrength', text: 'deve conter pelo menos uma letra e um número.' },
  { tipo: 'passwordUnmatched', text: 'As senhas não coincidem.' },
  { tipo: 'invalidCPF', text: 'CPF inválido.' },
];
