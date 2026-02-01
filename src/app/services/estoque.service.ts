import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private apiUrl = 'http://localhost:5050/api/Estoque';

  constructor(private http: HttpClient) { }

  // Pega a lista de peças
  getEstoque(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Cadastra uma peça nova
  adicionarPeca(peca: any): Observable<any> {
    return this.http.post(this.apiUrl, peca);
  }

  limparTudo(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/limpar-tudo`);
  }
}