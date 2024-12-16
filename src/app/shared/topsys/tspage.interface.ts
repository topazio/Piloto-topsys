import { TSCrudModel } from "./tscrud-model";

export interface ITSPage extends TSCrudModel{
  id: number;
  page?: number;
  pageIndex: number;
  size?: number;
}
export interface IRespostaLazyPesquisaJson {
  data: any;
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number;
}
