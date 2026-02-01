import { Routes } from '@angular/router';
import { TableCadastroVeiculos } from '../../pages/cadastroVeiculos/table.component';
import { AluguelComponent } from '../../pages/aluguel/aluguel.component';
import { ManutencoesRevisoesComponent } from '../../pages/manutencoes-revisoes/manutencoes-revisoes.component';
import { EstoqueCadastroComponent } from '../../pages/estoque-cadastro/estoque-cadastro.component';
import { TrocaPecaComponent } from 'app/pages/troca-peca/troca-peca.component';
import { AbastecimentoComponent } from 'app/pages/abastecimento/abastecimento.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'cadastroDeVeiculos', component: TableCadastroVeiculos },
    { path: 'aluguel',           component: AluguelComponent },
    { path: 'manutencoes-revisoes', component: ManutencoesRevisoesComponent },
    { path: 'estoque', component: EstoqueCadastroComponent },
    { path: 'troca-peca', component: TrocaPecaComponent },
    { path: 'abastecimento', component: AbastecimentoComponent },
];
