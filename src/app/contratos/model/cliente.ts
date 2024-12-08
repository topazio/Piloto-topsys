import { TSCrudModel } from "../../shared/topsys/tscrud-model";

export interface ICliente extends TSCrudModel{
    id: number;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    email: string;
    endereco: string;
    telefone: string;
    cidadeId: number;

}

