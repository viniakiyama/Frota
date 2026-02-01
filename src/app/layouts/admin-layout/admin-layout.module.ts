import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

//Declaração de componente
import { TableCadastroVeiculos } from '../../pages/cadastroVeiculos/table.component';
import { AluguelComponent } from '../../pages/aluguel/aluguel.component';
import { ManutencoesRevisoesComponent } from 'app/pages/manutencoes-revisoes/manutencoes-revisoes.component';
import { EstoqueCadastroComponent } from 'app/pages/estoque-cadastro/estoque-cadastro.component';
import { TrocaPecaComponent } from 'app/pages/troca-peca/troca-peca.component';
import { AbastecimentoComponent } from 'app/pages/abastecimento/abastecimento.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  declarations: [
    TableCadastroVeiculos,
    AluguelComponent,
    ManutencoesRevisoesComponent,
    EstoqueCadastroComponent,
    TrocaPecaComponent,
    AbastecimentoComponent
  ]
})

export class AdminLayoutModule { }
