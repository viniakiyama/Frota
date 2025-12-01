import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css']
})

export class TableCadastroVeiculos implements OnInit {
    cadastroVeiculoForm: FormGroup;
    constructor(private fb: FormBuilder) { }


    ngOnInit() {
        this.cadastroVeiculoForm = this.fb.group({
            //input
            placa: ['', Validators.required],
            quilometragemAtual: [''],
            motoristaResponsavel: [''],
            dataAquisicao: [''],
            valorAquisicao: [''],
            observacoes: [''],

            //select
            marca: ['', Validators.required],
            modelo: ['', Validators.required],
            ano: [''],
            categoria: [''],
            situacao: [''],
            localAlocacao: ['']
        });
    }

    onSubmit() {
        if (this.cadastroVeiculoForm.valid) {
            // Aqui você obterá todos os dados como um objeto JSON
            const dadosVeiculo = this.cadastroVeiculoForm.value;
            console.log('Dados do Formulário prontos para envio:', dadosVeiculo);
            // Próxima etapa: Chamar o VeiculoService para enviar os dados
            // this.veiculoService.salvarVeiculo(dadosVeiculo).subscribe(...); 
        } else {
            console.error('Formulário inválido. Verifique os campos obrigatórios!');
            // Opcional: Adicionar lógica para marcar campos como 'touched' para exibir erros
        }
    }

}
