export interface ManutencaoModel {
    id?: number; // O '?' indica que é opcional (o banco gera o ID)
    veiculoId: number;
    dataManutencao: string;
    tipo: string; // "Preventiva" ou "Corretiva"
    itensSubstituidos: string;
    quilometragem: number;
    oficinaResponsavel: string;
    valorServico: number;

    // Campos cruciais para o alerta da RN003
    proximaRevisaoData: string;
    proximaRevisaoKm: number;
}