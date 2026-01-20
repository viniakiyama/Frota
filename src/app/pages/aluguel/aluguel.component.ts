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
            // 1. AJUSTADO: Nome deve ser dataHoraTransferencia para casar com o C#
            dataHoraTransferencia: [this.getDataAtual(), Validators.required], 
            localOrigem: ['', Validators.required],
            localDestino: ['', Validators.required]
        });

        this.atualizarListas();
    }

    atualizarListas() {
        this.veiculoService.obterVeiculos().subscribe({
            next: (dados) => {
                // 2. FILTRO: Removido o acento para bater com seu cadastro 'DISPONIVEL'
                this.veiculosDisponiveis = dados.filter(v =>
                    v.situacao && v.situacao.toUpperCase().trim() === 'DISPONIVEL'
                );

                this.veiculosAlugados = dados.filter(v =>
                    v.situacao && v.situacao.toUpperCase().trim() === 'ALUGADO'
                );
            },
            error: (err) => console.error('Erro ao atualizar listas:', err)
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
                motorista: dados.motorista.toUpperCase(),
                localOrigem: dados.localOrigem.toUpperCase(),
                localDestino: dados.localDestino.toUpperCase()
                // Aqui o campo dataHoraTransferencia já vai automático pelo '...dados'
            };

            this.aluguelService.registrarAluguel(payload).subscribe({
                next: (res) => {
                    alert('Aluguel registrado com sucesso!');
                    // 3. AJUSTADO: Resetando com o nome novo do campo
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