import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICliente } from '../model/cliente';
import { TSCrudService } from '../../../shared/topsys/tscrud-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService extends TSCrudService<ICliente> {

  override getUrl(): string {
    return 'http://localhost:3000/clientes';
  }



}
