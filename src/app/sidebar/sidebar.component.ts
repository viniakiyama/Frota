import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/cadastroDeVeiculos', title: 'Cadastro de Veículos', icon: 'nc-tile-56', class: '' },
    { path: '/manutencoesErevisoes', title: 'Manutenções e Revisões', icon: 'nc-tile-56', class: '' },
    { path: '/abastecimentos', title: 'Abastecimentos', icon: 'nc-tile-56', class: '' },
    { path: '/trocaDepecas', title: 'Troca de Peças', icon: 'nc-tile-56', class: '' },
    { path: '/indicadoresEalertas', title: 'Indicadores e Alertas', icon: 'nc-tile-56', class: '' },
    { path: '/usuariosEperfis', title: 'Usuários e Perfis', icon: 'nc-tile-56', class: '' },
    //{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    //{ path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    //{ path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    //{ path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
