import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrocaPecaService {
  private apiUrl = 'http://localhost:5050/api/TrocaPeca';

  constructor(private http: HttpClient) { }

  listarTrocas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registrarTroca(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }
}