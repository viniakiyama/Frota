import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Verifique se a porta da sua API no Visual Studio é a 7041
  private apiUrl = 'http://localhost:5050/api/usuarios'; 

  constructor(private http: HttpClient) { }

  // Método para cadastrar novo usuário
  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, usuario);
  }

  // Método para fazer login (usaremos em breve)
  login(credenciais: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciais);
  }
}