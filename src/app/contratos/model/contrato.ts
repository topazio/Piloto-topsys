import { TSCrudModel } from "../../shared/topsys/tscrud-model";

export interface IContrato extends TSCrudModel{

    clienteId: string;
    dataInicio: string;
    dataFim: string;
    valor: string;
    status: string;

}
