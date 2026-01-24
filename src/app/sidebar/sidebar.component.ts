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
    { path: '/aluguel', title: 'Aluguel de Veículos', icon: 'nc-delivery-fast', class: '' },
    { path: '/manutencoes-revisoes', title: 'Manutenções e Revisões', icon: 'nc-tile-56', class: '' },
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
