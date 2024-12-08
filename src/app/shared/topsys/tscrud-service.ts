import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TSCrudModel } from "./tscrud-model";
import { HttpClient } from "@angular/common/http";


export abstract class TSCrudService<T extends TSCrudModel> {

  protected http = inject(HttpClient);

  readonly URL;

  abstract getUrl(): string;

  constructor(){
    this.URL = this.getUrl();
  }

  delete(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  find(item: T) {
      return this.http.post<T[]>(`${this.URL}`, item);
  }

  findDBJson(campo: string, item: string) {
    if(item){
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
