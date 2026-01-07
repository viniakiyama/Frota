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
        // Inicializa o formulário
        this.cadastroVeiculoForm = this.fb.group({
            placa: ['', Validators.required],
            chassi: ['', Validators.required],
            renavam: ['', Validators.required],
            modelo: ['', Validators.required],
            marca: ['', Validators.required],
            ano: [null, Validators.required],
            categoria: ['Carro', Validators.required],
            quilometragemAtual: [null, Validators.required],
            situacao: ['Ativo', Validators.required],
            localAlocacao: ['', Validators.required],
            observacoes: ['']
        });
        // BUSCA OS DADOS ASSIM QUE ENTRA NA TELA
        this.listarVeiculos();
    }

    listarVeiculos() {
        this.veiculoService.obterVeiculos().subscribe({
            next: (dados) => {
                this.veiculos = dados; // Os dados chegam do banco
            },
            error: (err) => console.error('Erro ao listar veículos:', err)
        });
    }

    onSubmit() {
        if (this.cadastroVeiculoForm.valid) {
            // 1. Pega o objeto com os dados
            const dadosVeiculo = this.cadastroVeiculoForm.value;

            // 2. Transforma os campos desejados em Maiúsculo diretamente no objeto (nao tem ano e nem quilometragem aqui porque eles são numericos, nao precisa de upperCase)
            dadosVeiculo.placa = dadosVeiculo.placa?.toUpperCase();
            dadosVeiculo.chassi = dadosVeiculo.chassi?.toUpperCase();
            dadosVeiculo.renavam = dadosVeiculo.renavam?.toUpperCase();
            dadosVeiculo.modelo = dadosVeiculo.modelo?.toUpperCase();
            dadosVeiculo.marca = dadosVeiculo.marca?.toUpperCase();
            dadosVeiculo.categoria = dadosVeiculo.categoria?.toUpperCase();
            dadosVeiculo.situacao = dadosVeiculo.situacao?.toUpperCase();
            dadosVeiculo.localAlocacao = dadosVeiculo.localAlocacao?.toUpperCase();
            dadosVeiculo.observacoes = dadosVeiculo.observacoes?.toUpperCase();

            // 3. Envia o objeto já formatado
            this.veiculoService.salvarVeiculo(dadosVeiculo)
                .subscribe({
                    next: (response) => {
                        console.log('Veículo salvo com sucesso!', response);
                        //alert('Veículo cadastrado!');
                        this.cadastroVeiculoForm.reset({ categoria: 'Carro', situacao: 'Ativo' }); // Limpa o formulário após o sucesso
                        // ATUALIZA A LISTA NA TELA
                        this.listarVeiculos();
                    },
                    error: (error) => {
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
