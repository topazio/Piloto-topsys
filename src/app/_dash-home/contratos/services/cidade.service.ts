import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICidade } from '../model/cidade';
import { TSCrudService } from '../../../shared/topsys/tscrud-service';


@Injectable({
  providedIn: 'root'
})
export class CidadeService extends TSCrudService<ICidade>{

  override getUrl(): string {
    return 'http://localhost:3000/cidades';
  }

  listPorEstado(estadoId: any){
    return this.http.get<ICidade[]>(`${this.getUrl()}?estadoId=${estadoId}`);
  }

}
