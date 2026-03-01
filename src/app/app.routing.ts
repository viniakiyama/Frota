import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './pages/login/login.component';

export const AppRoutes: Routes = [
  // 1. ROTA INICIAL: Redireciona o caminho vazio para o login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // 2. ROTAS LIMPAS (Sem Sidebar/Navbar)
  {
    path: 'registrar',
    component: RegistrarUsuarioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // 3. ESTRUTURA ADMINISTRATIVA (Com Sidebar/Navbar)
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }
    ]
  },
  // 4. TRATAMENTO DE ERRO: Qualquer rota inexistente volta para o login
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];