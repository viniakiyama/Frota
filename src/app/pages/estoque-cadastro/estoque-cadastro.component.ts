import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../../services/estoque.service';

@Component({
  selector: 'app-estoque-cadastro',
  templateUrl: './estoque-cadastro.component.html'
})
export class EstoqueCadastroComponent implements OnInit {
  listaPecas: any[] = [];
  novaPeca = { nome: '', codigoEstoque: '', valor: 0 };

  constructor(private estoqueService: EstoqueService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.estoqueService.getEstoque().subscribe(res => this.listaPecas = res);
  }

  salvar() {
    this.estoqueService.adicionarPeca(this.novaPeca).subscribe(() => {
      this.listar(); // Recarrega a tabela
      this.novaPeca = { nome: '', codigoEstoque: '', valor: 0 }; // Limpa os campos
    });
  }
}