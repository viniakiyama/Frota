import { Routes } from '@angular/router';
import { TableCadastroVeiculos } from '../../pages/cadastroVeiculos/table.component';
import { AluguelComponent } from '../../pages/aluguel/aluguel.component';
import { ManutencoesRevisoesComponent } from '../../pages/manutencoes-revisoes/manutencoes-revisoes.component';
//import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
//tabelas quee inseri
//import { TableManutencoesErevisoes } from '../../pages/manutencoesErevisoes/table.component';
//import { TableAbastecimentos } from '../../pages/abastecimentos/table.component';
//import { TableTrocaDePecas } from '../../pages/trocaDePecas/table.component';
//import { TableIndicadoresEalertas } from '../../pages/indicadoresEalertas/table.component';
//import { TableUsuariosEperfis} from '../../pages/usuariosEperfis/table.component';
//import { UserComponent } from '../../pages/user/user.component';
//import { IconsComponent } from '../../pages/icons/icons.component';
//import { MapsComponent } from '../../pages/maps/maps.component';
//import { NotificationsComponent } from '../../pages/notifications/notifications.component';
//import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'cadastroDeVeiculos', component: TableCadastroVeiculos },
    { path: 'aluguel',           component: AluguelComponent },
    { path: 'manutencoes-revisoes', component: ManutencoesRevisoesComponent },
    //{ path: 'dashboard', component: DashboardComponent },
    //{ path: 'manutencoesErevisoes', component: TableManutencoesErevisoes },
    //{ path: 'abastecimentos', component: TableAbastecimentos },
    //{ path: 'trocaDepecas', component: TableTrocaDePecas },
    //{ path: 'indicadoresEalertas', component: TableIndicadoresEalertas },
    //{ path: 'usuariosEperfis', component: TableUsuariosEperfis },
    //{ path: 'user', component: UserComponent },
    //{ path: 'icons', component: IconsComponent },
    //{ path: 'maps', component: MapsComponent },
    //{ path: 'notifications', component: NotificationsComponent },
    //{ path: 'upgrade', component: UpgradeComponent }
];
