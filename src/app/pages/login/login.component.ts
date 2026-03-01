import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

//import { delay } from 'rxjs/operators'; //delay

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  carregando: boolean = false;
  mensagemErro: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  entrar() {
    this.carregando = true;
    this.mensagemErro = ''; // Limpa o erro ao tentar logar novamente

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        //.pipe(delay(3000))
        .subscribe({
          next: (res) => {
            localStorage.setItem('usuarioLogado', res.nome);
            localStorage.setItem('cargoUsuario', res.cargo);
            this.router.navigate(['/cadastroDeVeiculos']);
          },
          error: (err) => {
            this.carregando = false;
            this.mensagemErro = "Usuário ou senha incorretos.";
            console.error(err);
          }
        });
    }
  }
}
