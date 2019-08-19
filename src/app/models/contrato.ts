export interface Contrato {
    _id: string;
    codigo: number;
    numero: number;
    contrato: number;
    licitacao: number;
    modalidade: string;
    tipo: string;
    objeto: string;
    favorecido: string;
    valorInicial: number;
    valorAditivo: number;
    dataInicial: Date;
    dataFinal: Date;
    valorEmpenhado: number;
    valorAEmpenhar: number;
    valorLiquidado: number;
    valorALiquidar: number;
    valorPago: number;
    valorAPagar: number;
    valorAPagarGeral: number;
}
