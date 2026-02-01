import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AbastecimentoService {
  private apiUrl = 'http://localhost:5050/api/Abastecimento';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registrar(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }
}