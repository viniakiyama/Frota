import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alerta {
    mensagem: string;
    link: string;
    tipo: 'manutencao' | 'documento' | 'financeiro' | 'consumo';
}

@Injectable({
    providedIn: 'root'
})
export class AlertaService {
    // URL base da sua API (ajuste a porta se necessário)
    private readonly API_BASE = 'http://localhost:5050/api'; 

    constructor(private http: HttpClient) { }

    // Chamada específica para a tela de manutenções
    obterAlertasManutencao(): Observable<Alerta[]> {
        return this.http.get<Alerta[]>(`${this.API_BASE}/manutencoes/vencidas`);
    }
}