import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeiculoService } from 'app/services/veiculo.service';
import { AluguelService } from 'app/services/aluguel.service';

@Component({
    selector: 'app-aluguel',
    templateUrl: './aluguel.component.html',
    styleUrls: ['./aluguel.component.css']
})
export class AluguelComponent implements OnInit {
    aluguelForm: FormGroup;
    veiculosDisponiveis: any[] = [];
    veiculosAlugados: any[] = [];

    constructor(
        private fb: FormBuilder,
        private veiculoService: VeiculoService,
        private aluguelService: AluguelService
    ) { }

    ngOnInit() {
        this.aluguelForm = this.fb.group({
            veiculoId: ['', Validators.required],
            motorista: ['', Validators.required],
            dataHoraTransferencia: [this.getDataAtual(), Validators.required],
            localOrigem: ['', Validators.required],
            localDestino: ['', Validators.required]
        });

        this.atualizarListas();
    }

    atualizarListas() {
        this.veiculoService.obterVeiculos().subscribe({
            next: (dados) => {
                // Filtramos apenas para mostrar quem está 'DISPONIVEL'
                // O filtro de 'ativo' saiu porque se o carro foi excluído, ele nem vem do banco.
                this.veiculosDisponiveis = dados.filter(v =>
                    v.situacao && v.situacao.toUpperCase().trim() === 'DISPONIVEL'
                );
            },
            error: (err) => console.error('Erro ao buscar veículos:', err)
        });

        // Busca o histórico de alugados
        this.aluguelService.obterHistorico().subscribe({
            next: (dados) => this.veiculosAlugados = dados,
            error: (err) => console.error('Erro ao buscar aluguéis:', err)
        });
    }

    getDataAtual() {
        const agora = new Date();
        agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
        return agora.toISOString().slice(0, 16);
    }

    onSubmit() {
        if (this.aluguelForm.valid) {
            const dados = this.aluguelForm.value;
            const veiculoSelecionado = this.veiculosDisponiveis.find(v => v.id == dados.veiculoId);

            const payload = {
                ...dados,
                placa: veiculoSelecionado ? veiculoSelecionado.placa : '',
                modelo: veiculoSelecionado ? veiculoSelecionado.modelo : '',
                motorista: dados.motorista.toUpperCase(),
                localOrigem: dados.localOrigem.toUpperCase(),
                localDestino: dados.localDestino.toUpperCase()
            };

            this.aluguelService.registrarAluguel(payload).subscribe({
                next: (res) => {
                    alert('Aluguel registrado com sucesso!');
                    this.aluguelForm.reset({ dataHoraTransferencia: this.getDataAtual() });
                    this.atualizarListas();
                },
                error: (err) => {
                    console.error(err);
                    alert('Erro ao salvar aluguel. Verifique o console.');
                }
            });
        }
    }
}