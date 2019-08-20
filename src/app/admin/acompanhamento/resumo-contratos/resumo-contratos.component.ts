import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContratoService } from './../../../services/contrato.service';
import { Subscription } from 'rxjs';
import { Contrato } from './../../../models/contrato';

import * as moment from 'moment';

@Component({
  selector: 'app-resumo-contratos',
  templateUrl: './resumo-contratos.component.html',
  styleUrls: ['./resumo-contratos.component.scss']
})
export class ResumoContratosComponent implements OnInit, OnDestroy {
  qtdContratos: number;
  qtdContratosVigente: number;
  qtdContratosVencidos: number;
  qtdEmpenhados: number;
  qtdLiquidados: number;
  qtdPagos: number;
  qtdVence10Dias: number;
  qtdVence20Dias: number;
  qtdVence30Dias: number;
  dt10Dias: string;
  dt20Dias: string;
  dt30Dias: string;
  valorTotal: number;
  valorEmpenhados: number;
  valorLiquidados: number;
  valorPagos: number;
  valorTotalSoma: number;

  subscription: Subscription;
  constructor(
    private contratoService: ContratoService
  ) {
  }

  ngOnInit() {
    this.subscription = this.contratoService.getContratos().subscribe(
      (retorno) => {
        this.GetTotais(retorno.data);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private GetTotais(contratos: Contrato[]) {
    this.qtdContratos = contratos.length;
    this.qtdContratosVigente = contratos.filter(x => new Date(x.dataFinal).getTime() > new Date().getTime()).length;
    this.qtdEmpenhados = contratos.filter(x => x.valorEmpenhado > 0).length;
    this.qtdLiquidados = contratos.filter(x => x.valorLiquidado > 0).length;
    this.qtdPagos = contratos.filter(x => x.valorPago > 0).length;
    this.qtdContratosVencidos = this.qtdContratos - this.qtdContratosVigente;

    this.valorTotal = 0;
    this.valorEmpenhados = 0;
    this.valorLiquidados = 0;
    this.valorPagos = 0;

    this.qtdVence10Dias = 0;
    this.qtdVence20Dias = 0;
    this.qtdVence30Dias = 0;

    const dtAtual = moment();
    contratos.forEach(contrato => {
      this.valorTotal += contrato.valorInicial;
      this.valorEmpenhados += contrato.valorEmpenhado;
      this.valorLiquidados += contrato.valorLiquidado;
      this.valorPagos += contrato.valorPago;

      const dtContrato = moment(contrato.dataFinal);
      const diff = dtContrato.diff(dtAtual, 'days');
      if (diff > 0 && diff <= 10) {
        this.qtdVence10Dias++;
      }
      if (diff > 10 && diff <= 20) {
        this.qtdVence20Dias++;
      }
      if (diff > 20 && diff <= 30) {
        this.qtdVence30Dias++;
      }
    });

    this.valorTotalSoma = this.valorTotal + this.valorEmpenhados + this.valorLiquidados + this.valorPagos;

    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const currentDatetime = new Date();
    currentDatetime.setDate(currentDatetime.getDate() + 10);
    let formattedDate = currentDatetime.getDate() + ' ' + months[currentDatetime.getMonth()] + ' ' + currentDatetime.getFullYear();
    this.dt10Dias = formattedDate;
    currentDatetime.setDate(currentDatetime.getDate() + 10);
    formattedDate = currentDatetime.getDate() + ' ' + months[currentDatetime.getMonth()] + ' ' + currentDatetime.getFullYear();
    this.dt20Dias = formattedDate;
    currentDatetime.setDate(currentDatetime.getDate() + 10);
    formattedDate = currentDatetime.getDate() + ' ' + months[currentDatetime.getMonth()] + ' ' + currentDatetime.getFullYear();
    this.dt30Dias = formattedDate;

  }

}
