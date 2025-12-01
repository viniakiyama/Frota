import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';

//tabelas que inseri
import { TableCadastroVeiculos } from '../../pages/cadastroVeiculos/table.component';
import { TableManutencoesErevisoes } from '../../pages/manutencoesErevisoes/table.component';
import { TableAbastecimentos } from '../../pages/abastecimentos/table.component';
import { TableTrocaDePecas } from '../../pages/trocaDePecas/table.component';
import { TableIndicadoresEalertas } from '../../pages/indicadoresEalertas/table.component';
import { TableUsuariosEperfis } from '../../pages/usuariosEperfis/table.component';

import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core';


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
    DashboardComponent,
    UserComponent,
    TableCadastroVeiculos,
    TableManutencoesErevisoes,
    TableAbastecimentos,
    TableTrocaDePecas,
    TableIndicadoresEalertas,
    TableUsuariosEperfis,
    UpgradeComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule { }
