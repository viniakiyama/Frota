import { Injectable } from '@angular/core';

// Importe o HttpClient para fazer requisições HTTP
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Usado para lidar com resultados assíncronos

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  // Defina a URL base da sua API aqui
  private apiUrl = 'http://localhost:5022/api/veiculos'; // CORRETO

  // Injete o HttpClient no construtor
  constructor(private http: HttpClient) { }

  // Método para enviar os dados de um novo veículo (Requisição POST)
  salvarVeiculo(veiculoData: any): Observable<any> {
    // O método .post() envia o objeto veiculoData para a URL da API
    // e espera uma resposta.
    return this.http.post<any>(this.apiUrl, veiculoData);
  }
}