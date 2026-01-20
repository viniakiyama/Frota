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

    idEmEdicao: number | null = null; // Armazena o ID do veículo sendo editado

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

    // 1. Função para carregar os dados da linha no formulário
    prepararEdicao(veiculo: any) {
        this.idEmEdicao = veiculo.id;
        this.cadastroVeiculoForm.patchValue(veiculo); // Preenche o form com os dados do objeto
        window.scrollTo(0, 0); // Sobe a tela para o formulário
    }

    excluir(id: number) {
        if (confirm('DESEJA REALMENTE EXCLUIR ESTE VEÍCULO?')) {
            this.veiculoService.excluirVeiculo(id).subscribe({
                next: () => {
                    //alert('VEÍCULO REMOVIDO COM SUCESSO!');
                    this.listarVeiculos(); // Atualiza a lista na tela
                },
                error: (err) => {
                    console.error('ERRO AO EXCLUIR:', err);
                    alert('NÃO FOI POSSÍVEL EXCLUIR O VEÍCULO.');
                }
            });
        }
    }

    onSubmit() {
        if (this.cadastroVeiculoForm.valid) {
            // 1. Pega os dados atuais do formulário
            const dadosVeiculo = this.cadastroVeiculoForm.value;

            // 2. Aplica o UpperCase (seu código atual)
            dadosVeiculo.placa = dadosVeiculo.placa?.toUpperCase();
            dadosVeiculo.chassi = dadosVeiculo.chassi?.toUpperCase();
            dadosVeiculo.renavam = dadosVeiculo.renavam?.toUpperCase();
            dadosVeiculo.modelo = dadosVeiculo.modelo?.toUpperCase();
            dadosVeiculo.marca = dadosVeiculo.marca?.toUpperCase();
            dadosVeiculo.categoria = dadosVeiculo.categoria?.toUpperCase();
            dadosVeiculo.situacao = dadosVeiculo.situacao?.toUpperCase();
            dadosVeiculo.localAlocacao = dadosVeiculo.localAlocacao?.toUpperCase();
            dadosVeiculo.observacoes = dadosVeiculo.observacoes?.toUpperCase();

            // 3. DECISÃO: EDITAR OU SALVAR?
            if (this.idEmEdicao) {
                // --- LÓGICA DE ATUALIZAÇÃO (PUT) ---
                dadosVeiculo.id = this.idEmEdicao; // O C# precisa do ID dentro do objeto

                this.veiculoService.atualizarVeiculo(this.idEmEdicao, dadosVeiculo).subscribe({
                    next: () => {
                        console.log('Veículo atualizado!');
                        this.resetarAposSucesso();
                    },
                    error: (error) => {
                        console.error('Erro ao atualizar:', error);
                        alert('Erro na atualização.');
                    }
                });

            } else {
                // --- LÓGICA DE CADASTRO NOVO (POST) ---
                this.veiculoService.salvarVeiculo(dadosVeiculo).subscribe({
                    next: (response) => {
                        console.log('Veículo salvo!', response);
                        this.resetarAposSucesso();
                    },
                    error: (error) => {
                        console.error('Erro ao salvar:', error);
                        alert('Erro no cadastro.');
                    }
                });
            }
        }
    }

    // 4. Função auxiliar para limpar tudo e atualizar a tabela
    resetarAposSucesso() {
        this.idEmEdicao = null; // Limpa o ID de edição
        this.cadastroVeiculoForm.reset({ categoria: 'Carro', situacao: 'Ativo' });
        this.listarVeiculos();
    }

}
