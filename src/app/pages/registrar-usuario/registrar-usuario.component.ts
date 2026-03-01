import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // 1. Importações necessárias
import { AuthService } from '../../services/auth.service'; // Verifique se o caminho até a pasta services está correto
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html'
})
export class RegistrarUsuarioComponent implements OnInit {
  // 2. Declaração do grupo do formulário
  registroForm: FormGroup;

  // 3. Injeção do FormBuilder no construtor
  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // <--- Tem que estar aqui
    private router: Router,
  ) { }

  ngOnInit(): void {
    // 4. Inicialização do formulário com as validações
    this.registroForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      username: ['', Validators.required],
      cargo: ['Operacional', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, {
      // 5. Aplica a validação customizada de comparar senhas
      validator: this.checkSenhas
    });
  }

  // 6. Função que verifica se as senhas são iguais
  checkSenhas(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirm = group.get('confirmarSenha')?.value;
    return senha === confirm ? null : { notSame: true };
  }

  // 7. Função que será chamada ao clicar no botão "Criar Conta"
  cadastrar() {
    if (this.registroForm.valid) {
      const { confirmarSenha, ...dadosUsuario } = this.registroForm.value;

      this.authService.registrar(dadosUsuario).subscribe({
        next: (res) => {
          alert("Usuário cadastrado com sucesso!");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          // Se a API retornar o BadRequest (400), a mensagem estará aqui
          if (err.status === 400) {
            alert(err.error); // Vai exibir: "Este nome de usuário já está em uso."
          } else {
            alert("Ocorreu um erro inesperado no servidor.");
          }
        }
      });
    }
  }
}