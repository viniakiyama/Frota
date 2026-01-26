import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManutencaoModel } from '../models/manutencao.model'; // Importe a interface que criamos

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  // Porta 5050 onde sua API está rodando
  private apiUrl = 'http://localhost:5050/api/manutencoes';

  constructor(private http: HttpClient) { }

  // Agora o Angular sabe exatamente o que deve enviar para o .NET
  registrarManutencao(dados: ManutencaoModel): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  listarManutencoes(): Observable<ManutencaoModel[]> {
    return this.http.get<ManutencaoModel[]>(this.apiUrl);
  }
}