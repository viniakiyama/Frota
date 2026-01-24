import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AluguelService {

    private apiUrl = 'http://localhost:5050/api/alugueis';

    constructor(private http: HttpClient) { }

    registrarAluguel(dadosAluguel: any): Observable<any> {
        return this.http.post(this.apiUrl, dadosAluguel);
    }

    obterHistorico(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}