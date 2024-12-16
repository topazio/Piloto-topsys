import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TSCrudModel } from "./tscrud-model";
import { HttpClient } from "@angular/common/http";
import { IRespostaLazyPesquisaJson } from "./tspage.interface";


export abstract class TSCrudService<T extends TSCrudModel> {

  protected http = inject(HttpClient);

  readonly URL;

  abstract getUrl(): string;

  constructor() {
    this.URL = this.getUrl();
  }

  delete(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  find(item: T) {
    return this.http.post<T[]>(`${this.URL}`, item);
  }

   //METODO LAZY LOAD PARA DB JSON SERVER:
  changePageDBJson(campo?: string, item?: string, pageIndex: number = 0, pageSize: number = 15) {
    let paginaParse;
    paginaParse = pageIndex + 1;
    if (item) {
      return this.http.get<IRespostaLazyPesquisaJson>(`${this.URL}?${campo}=${item}&_page=${paginaParse}&_per_page=${pageSize}`);
    }
    return this.http.get<IRespostaLazyPesquisaJson>(`${this.URL}?_page=${paginaParse}&_per_page=${pageSize}`);

  }
  findDBJson(campo: string, item: string) {
    if (item) {
      return this.http.get<T[]>(`${this.URL}?${campo}=${item}`);
    }
    return this.getAll();
  }

  getAll() {
    return this.http.get<T[]>(`${this.URL}`);
  }

  getById(id: any) {
    return this.http.get<T>(`${this.URL}/${id}`);
  }

  insert(item: T) {
    return this.http.post<T>(`${this.URL}`, item);
  }

  update(item: T) {
    return this.http.put<T>(`${this.URL}/${item.id}`, item);
  }

}
