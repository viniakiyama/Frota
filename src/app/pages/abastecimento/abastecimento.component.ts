import { Component, OnInit } from '@angular/core';
import { AbastecimentoService } from '../../services/abastecimento.service';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-abastecimento',
  templateUrl: './abastecimento.component.html'
})
export class AbastecimentoComponent implements OnInit {
  veiculos: any[] = [];
  historico: any[] = [];

  // Opções fixas conforme solicitado
  tiposCombustivel = ['Gasolina Comum', 'Gasolina Aditivada', 'Álcool', 'Diesel'];
  postosGasolina = ['Posto BR', 'Shell', 'Ipiranga', 'Texaco', 'Posto Ale'];

  novoAbastecimento = {
    veiculoId: null,
    litros: 0,
    valorTotal: 0,
    tipoCombustivel: '',
    posto: '',
    quilometragem: 0
  };

  constructor(
    private abastecimentoService: AbastecimentoService,
    private veiculoService: VeiculoService
  ) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.veiculoService.obterVeiculos().subscribe(res => {
      // Isso garante que o usuário não consiga selecionar um carro inativo para novos gastos
      this.veiculos = res.filter(v => v.situacao !== "INATIVO" && v.situacao !== "Inativo");
    });
    this.abastecimentoService.listar().subscribe(res => this.historico = res);
  }

  // Adicione este método dentro da classe AbastecimentoComponent
  aoSelecionarVeiculo() {
    // Localiza o objeto do veículo pelo ID selecionado no dropdown
    const veiculoSelecionado = this.veiculos.find(v => v.id == this.novoAbastecimento.veiculoId);

    if (veiculoSelecionado) {
      // Preenche o campo de quilometragem com o valor atual do carro
      this.novoAbastecimento.quilometragem = veiculoSelecionado.quilometragemAtual;
    } else {
      this.novoAbastecimento.quilometragem = 0;
    }
  }

  salvar() {
    this.abastecimentoService.registrar(this.novoAbastecimento).subscribe({
      next: () => {
        //alert('Abastecimento registrado!');
        this.carregarDados();
        this.limparForm();
      },
      error: (err) => alert(err.error) // Exibe o erro de KM menor se o Back-end barrar
    });
  }

  limparForm() {
    this.novoAbastecimento = { veiculoId: null, litros: 0, valorTotal: 0, tipoCombustivel: '', posto: '', quilometragem: 0 };
  }
}