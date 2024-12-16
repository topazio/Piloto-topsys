import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { IEstado } from '../model/estado';
import { TSCrudService } from '../../../shared/topsys/tscrud-service';



@Injectable({
  providedIn: 'root'
})
export class EstadoService extends TSCrudService<IEstado>{

  override getUrl(): string {
    return 'http://localhost:3000/estados';
  }


}
