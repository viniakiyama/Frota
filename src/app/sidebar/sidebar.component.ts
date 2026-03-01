import { Component, OnInit } from '@angular/core';
import { VeiculoService } from 'app/services/veiculo.service';
import { EstoqueService } from 'app/services/estoque.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/cadastroDeVeiculos', title: 'Cadastro de Veículos', icon: 'nc-tile-56', class: '' },
    { path: '/aluguel', title: 'Aluguel de Veículos', icon: 'nc-tile-56', class: '' },
    { path: '/manutencoes-revisoes', title: 'Manutenções e Revisões', icon: 'nc-tile-56', class: '' },
    { path: '/estoque', title: 'Estoque', icon: 'nc-tile-56', class: '' },
    { path: '/troca-peca', title: 'Troca de Peças', icon: 'nc-tile-56', class: '' },
    { path: '/abastecimento', title: 'Abastecimento', icon: 'nc-tile-56', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    cargoUsuario: string = '';
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.cargoUsuario = localStorage.getItem('cargoUsuario') || '';

        const todasAsRotas = [
            { path: '/cadastroDeVeiculos', title: 'Veículos', icon: 'transport_automotive', class: '', cargos: ['Admin', 'Gestor de Frota', 'Operacional'] },
            { path: '/aluguel', title: 'Aluguel', icon: 'shopping_shop', class: '', cargos: ['Admin', 'Gestor de Frota'] },
            { path: '/manutencoes-revisoes', title: 'Manutenções', icon: 'ui-2_settings-90', class: '', cargos: ['Admin', 'Gestor de Frota'] },
            { path: '/estoque', title: 'Estoque', icon: 'design_app', class: '', cargos: ['Admin'] },
            { path: '/troca-peca', title: 'Troca de Peça', icon: 'loader_gear', class: '', cargos: ['Admin'] },
            { path: '/abastecimento', title: 'Abastecimento', icon: 'location_map-big', class: '', cargos: ['Admin', 'Operacional'] },
        ];

        this.menuItems = todasAsRotas.filter(menuItem =>
            menuItem.cargos.includes(this.cargoUsuario)
        );
    }

    constructor(
        private veiculoService: VeiculoService,
        private estoqueService: EstoqueService
    ) { }

    limparTudo() {
        // 1. Limpa os veículos (e o que já estava limpando)
        this.veiculoService.resetTotal().subscribe({
            next: () => {
                // 2. Após limpar veículos, chama a limpeza do estoque
                this.estoqueService.limparTudo().subscribe({
                    next: () => {
                        // 3. Só recarrega a página quando tudo terminar
                        window.location.reload();
                    },
                    error: (err) => {
                        console.error("Erro no Estoque:", err);
                        alert("Erro ao limpar estoque: " + err.message);
                    }
                });
            },
            error: (err) => {
                console.error("Erro no Veículo:", err);
                alert("Erro ao limpar veículos: " + err.message);
            }
        });
    }

}
