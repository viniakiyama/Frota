import { Injectable } from '@angular/core';

// Importe o HttpClient para fazer requisições HTTP
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Usado para lidar com resultados assíncronos

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  // Defina a URL base da sua API aqui
  private apiUrl = 'http://localhost:5050/api/veiculos'; // CORRETO

  // Injete o HttpClient no construtor
  constructor(private http: HttpClient) { }

  // método POST que envia os dados de um novo veículo 
  salvarVeiculo(veiculoData: any): Observable<any> {
    // O método .post() envia o objeto veiculoData para a URL da API
    // e espera uma resposta.
    return this.http.post<any>(this.apiUrl, veiculoData);
  }

  obterVeiculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //método DELETE que exclui os veículos
  excluirVeiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  resetTotal(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reset-total`);
  }

  // método PUT para atualizar um veículo existente
  atualizarVeiculo(id: number, veiculoData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, veiculoData);
  }
}