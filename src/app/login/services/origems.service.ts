import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrigemsService {
  readonly apiUrl = 'http://localhost:3000';

  constructor(readonly http: HttpClient) { };

  getImgOrigem(apelido: string | null = 'smpep'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/origem?apelido=${apelido}`);
  };
}
