import { Component, OnInit } from '@angular/core';
import { TrocaPecaService } from '../../services/troca-peca.service';
import { VeiculoService } from '../../services/veiculo.service';
import { EstoqueService } from '../../services/estoque.service';

@Component({
  selector: 'app-troca-peca',
  templateUrl: './troca-peca.component.html'
})
export class TrocaPecaComponent implements OnInit {

  aoSelecionarVeiculo() {
    // Procuramos na nossa lista de veículos o objeto que tem o ID selecionado
    const veiculoSelecionado = this.veiculos.find(v => v.id == this.novaTroca.veiculoId);

    if (veiculoSelecionado) {
      // Atribuímos o KM atual do veículo ao campo da nossa nova troca
      this.novaTroca.quilometragemNoMomento = veiculoSelecionado.quilometragemAtual;
    } else {
      this.novaTroca.quilometragemNoMomento = 0;
    }
  }

  aoSelecionarPeca() {
    // Busca a peça selecionada no array 'pecas'
    const pecaSelecionada = this.pecas.find(p => p.id == this.novaTroca.pecaId);

    if (pecaSelecionada) {
      // Atribui o valor unitário da peça ao campo de custo da troca
      this.novaTroca.valorCusto = pecaSelecionada.valor;
    } else {
      this.novaTroca.valorCusto = 0;
    }
  }

  // Listas para os selects
  veiculos: any[] = [];
  pecas: any[] = [];
  historico: any[] = [];

  // Objeto que será enviado ao C#
  novaTroca = {
    veiculoId: null,
    pecaId: null,
    quilometragemNoMomento: 0,
    motivoSubstituicao: '',
    valorCusto: 0
  };

  constructor(
    private trocaService: TrocaPecaService,
    private veiculoService: VeiculoService,
    private estoqueService: EstoqueService
  ) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.veiculoService.obterVeiculos().subscribe(res => {
      this.veiculos = res.filter(v => v.situacao !== "INATIVO" && v.situacao !== "Inativo");
    });
    this.estoqueService.getEstoque().subscribe(res => this.pecas = res);
    this.trocaService.listarTrocas().subscribe(res => this.historico = res);
  }

  salvar() {
    this.trocaService.registrarTroca(this.novaTroca).subscribe(() => {
      //alert('Troca registrada com sucesso!');
      this.carregarDados(); // Atualiza a tabela
      this.novaTroca = { veiculoId: null, pecaId: null, quilometragemNoMomento: 0, motivoSubstituicao: '', valorCusto: 0 };
    });
  }
}