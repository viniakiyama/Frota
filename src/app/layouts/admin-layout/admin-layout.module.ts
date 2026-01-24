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
//import { FormsModule } from '@angular/forms';
//import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
//import { UserComponent } from '../../pages/user/user.component';
//tabelas que inseri
//import { TableManutencoesErevisoes } from '../../pages/manutencoesErevisoes/table.component';
//import { TableAbastecimentos } from '../../pages/abastecimentos/table.component';
//import { TableTrocaDePecas } from '../../pages/trocaDePecas/table.component';
//import { TableIndicadoresEalertas } from '../../pages/indicadoresEalertas/table.component';
//import { TableUsuariosEperfis } from '../../pages/usuariosEperfis/table.component';
//import { IconsComponent } from '../../pages/icons/icons.component';
//import { MapsComponent } from '../../pages/maps/maps.component';
//import { NotificationsComponent } from '../../pages/notifications/notifications.component';
//import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

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
    //DashboardComponent,
    //UserComponent,
    //TableManutencoesErevisoes,
    //TableAbastecimentos,
    //TableTrocaDePecas,
    //TableIndicadoresEalertas,
    //TableUsuariosEperfis,
    //UpgradeComponent,
    //IconsComponent,
    //MapsComponent,
    //NotificationsComponent,
  ]
})

export class AdminLayoutModule { }
