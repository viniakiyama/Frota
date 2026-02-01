import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManutencaoService } from '../../services/manutencao.service';
import { VeiculoService } from '../../services/veiculo.service';
import { ManutencaoModel } from '../../models/manutencao.model';

@Component({
  selector: 'app-manutencoes-revisoes',
  templateUrl: './manutencoes-revisoes.component.html'
})
export class ManutencoesRevisoesComponent implements OnInit {
  formManutencao: FormGroup;
  listaVeiculos: any[] = []; // Para preencher o select de placas

  // Alterado de listaHistorico para listaManutencoes para bater com seu HTML
  listaManutencoes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private manutencaoService: ManutencaoService,
    private veiculoService: VeiculoService
  ) {
    this.formManutencao = this.fb.group({
      veiculoId: ['', Validators.required],
      dataManutencao: [new Date().toISOString().substring(0, 10), Validators.required],
      tipo: ['Preventiva', Validators.required],
      quilometragem: ['', [Validators.required, Validators.min(0)]],
      oficinaResponsavel: ['', Validators.required],
      valorServico: ['', [Validators.required, Validators.min(0)]],
      itensSubstituidos: [''],
      proximaRevisaoKm: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Busca os veículos para o dropdown - SEM FILTRO DE ATIVO
    this.veiculoService.obterVeiculos().subscribe({
      next: (dados) => {
        this.listaVeiculos = dados; // Agora todos os que estão no banco aparecem aqui
      },
      error: (err) => console.error('Erro ao carregar veículos', err)
    });

    this.carregarVeiculos();
    this.carregarHistorico();
  }

  carregarVeiculos() {
    this.veiculoService.obterVeiculos().subscribe({
      next: (dados) => {
        // Como você apaga do banco, basta receber os dados diretos.
        // Se o veículo sumiu do banco, ele não virá mais nesta lista.
        this.listaVeiculos = dados;
      },
      error: (err) => console.error('Erro ao carregar veículos', err)
    });
  }

  // Método para carregar a lista de histórico
  carregarHistorico() {
    this.manutencaoService.listarManutencoes().subscribe({
      // Atualizado para preencher a variável correta que o HTML espera
      next: (dados) => this.listaManutencoes = dados,
      error: (err) => console.error('Erro ao carregar histórico', err)
    });
  }

  aoSelecionarVeiculo() {
    const idSelecionado = this.formManutencao.get('veiculoId')?.value;
    const veiculo = this.listaVeiculos.find(v => v.id == idSelecionado);

    if (veiculo) {
      this.formManutencao.patchValue({
        quilometragem: veiculo.quilometragemAtual
      });
      console.log('Quilometragem carregada:', veiculo.quilometragemAtual);
    }
  }

  salvarManutencao() {
    console.log('Dados enviados:', this.formManutencao.value);
    if (this.formManutencao.valid) {
      const novaManutencao: ManutencaoModel = this.formManutencao.value;

      this.manutencaoService.registrarManutencao(novaManutencao).subscribe({
        next: (res) => {
          alert('Manutenção registrada com sucesso!');

          // Limpa o formulário
          this.formManutencao.reset({
            dataManutencao: new Date().toISOString().substring(0, 10),
            tipo: 'Preventiva'
          });

          // Atualiza a tabela de histórico imediatamente após salvar
          this.carregarHistorico();
        },
        error: (err) => alert('Erro ao salvar no banco: ' + err.message)
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}