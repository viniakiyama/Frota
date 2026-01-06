import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VeiculoService } from 'app/services/veiculo.service';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css']
})

export class TableCadastroVeiculos implements OnInit {
    cadastroVeiculoForm: FormGroup;

    veiculos: any[] = [];

    constructor(
        private fb: FormBuilder,
        private veiculoService: VeiculoService
    ) { }


    ngOnInit() {
        this.cadastroVeiculoForm = this.fb.group({
            placa: ['', Validators.required],
            chassi: ['', Validators.required],
            renavam: ['', Validators.required],
            marca: ['', Validators.required],
            modelo: ['', Validators.required],
            ano: [null, Validators.required],
            categoria: ['Carro', Validators.required],
            quilometragemAtual: [null, Validators.required],
            situacao: ['Ativo', Validators.required],
            localAlocacao: ['', Validators.required],
            observacoes: ['']
        });
    }

    listarVeiculos() {
    this.veiculoService.obterVeiculos().subscribe({
      next: (dados) => {
        this.veiculos = dados;
      },
      error: (err) => console.error('Erro ao listar veículos:', err)
    });
  }

    onSubmit() {
        if (this.cadastroVeiculoForm.valid) {
            // Aqui você obterá todos os dados como um objeto JSON
            const dadosVeiculo = this.cadastroVeiculoForm.value;
            this.veiculoService.salvarVeiculo(dadosVeiculo)
                .subscribe({
                    next: (response) => {
                        // Tratar sucesso (Ex: mostrar mensagem, resetar formulário)
                        console.log('Veículo salvo com sucesso!', response);
                        alert('Veículo cadastrado!');
                        this.cadastroVeiculoForm.reset(); // Limpa o formulário após o sucesso
                    },
                    error: (error) => {
                        // Tratar erro (Ex: mostrar erro para o usuário)
                        console.error('Erro ao salvar veículo:', error);
                        alert('Erro no cadastro. Verifique o console.');
                    }
                });
            console.log('Dados do Formulário prontos para envio:', dadosVeiculo);
            // Próxima etapa: Chamar o VeiculoService para enviar os dados
            // this.veiculoService.salvarVeiculo(dadosVeiculo).subscribe(...); 
        } else {
            console.error('Formulário inválido. Verifique os campos obrigatórios!');
            // Opcional: Adicionar lógica para marcar campos como 'touched' para exibir erros
        }
    }

}
