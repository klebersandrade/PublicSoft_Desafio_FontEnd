import * as moment from 'moment';

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
    chk: boolean;
}


export const getSumContratos = (contratos: Contrato[], prop: PropertyKey) => {
    if (!contratos[0].hasOwnProperty(prop)) {
        return 0;
    }
    let total = 0;
    contratos.forEach(contrato => {
        const valor = parseFloat(contrato[prop]);
        if (valor !== null) {
            total += valor;
        }
    });
    return total;
};

export const getDatasContratos = (contratos: Contrato[]) => {
    let minDate: moment.Moment;
    let maxDate: moment.Moment;
    contratos.forEach(contrato => {
        if (moment(contrato.dataInicial).diff(minDate) < 0) {
            minDate = moment(contrato.dataInicial);
        }

        if (moment(contrato.dataFinal).diff(maxDate) > 0) {
            maxDate = moment(contrato.dataFinal);
        }
    });
    const difDateTotal = maxDate.diff(minDate, 'days');
    const difDateAtual = moment().diff(minDate, 'days');

    return {
        minDate: minDate.toDate(),
        maxDate: maxDate.toDate(),
        difDateTotal,
        difDateAtual
    };
};

