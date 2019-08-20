import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { Subscription } from 'rxjs';
import { Contrato } from 'src/app/models/contrato';
import { Filtro } from './../../../models/filtro';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-detalhamento-contratos',
  templateUrl: './detalhamento-contratos.component.html',
  styleUrls: ['./detalhamento-contratos.component.scss']
})
export class DetalhamentoContratosComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  filtro: Filtro;
  subscriptionFiltro: Subscription;

  constructor(
    private contratoService: ContratoService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      if (this.filtro == null) {
        return true;
      }
      const dado: Contrato = settings.json.data[dataIndex];
      switch (this.filtro.tipo.toString()) {
        case '1':
          if (dado.codigo !== parseInt(this.filtro.valorFiltro, 10)) {
            return false;
          }
          break;
        case '2':
          // tslint:disable-next-line: no-string-literal
          if (dado.contrato !== parseInt(this.filtro.valorFiltro, 10)) {
            return false;
          }
          break;
      }

      switch (this.filtro.situacao.toString()) {
        case '1':
          if (this.filtro.situacaoVigente != null && this.filtro.situacaoVigente !== '') {
            const dtContratoFinal = moment(dado.dataFinal);
            const dtFiltroVigente = moment(this.filtro.situacaoVigente);
            if (dtContratoFinal.diff(dtFiltroVigente, 'days') > 0) {
              return false;
            }
          }
          break;
        case '2':
          if (this.filtro.situacaoVencimento != null && this.filtro.situacaoVencimento !== '') {
            const dtContratoFinal = moment(dado.dataFinal);
            const dtAtual = moment().add(parseInt(this.filtro.situacaoVencimento, 10), 'd');

            if (dtContratoFinal.diff(dtAtual, 'days') > 0) {
              return false;
            }
          }
          break;
      }

      if (this.filtro.valoresFiltroInicial > 0 && this.filtro.valoresFiltroInicial < dado.valorInicial + dado.valorAditivo) {
        return false;
      }

      if (this.filtro.valoresFiltroFinal > 0 && this.filtro.valoresFiltroFinal > dado.valorInicial + dado.valorAditivo) {
        return false;
      }

      if (this.filtro.datasFiltroInicial != null && this.filtro.datasFiltroInicial !== '') {
        const dtContratoInicial = moment(dado.dataInicial);
        const dtFiltroInicial = moment(this.filtro.datasFiltroInicial);
        if (dtContratoInicial.diff(dtFiltroInicial, 'days') < 0) {
          return false;
        }
      }

      if (this.filtro.datasFiltroFinal != null && this.filtro.datasFiltroFinal !== '') {
        const dtContratoFinal = moment(dado.dataFinal);
        const dtFiltroFinal = moment(this.filtro.datasFiltroFinal);
        if (dtContratoFinal.diff(dtFiltroFinal, 'days') < 0) {
          return false;
        }
      }


      if (this.filtro.valoresFiltroInicial != null && this.filtro.valoresFiltroInicial > 0) {
        if (this.filtro.valoresFiltroInicial < dado.valorInicial) {
          return false;
        }
      }

      if (this.filtro.valoresFiltroFinal != null && this.filtro.valoresFiltroFinal > 0) {
        if (this.filtro.valoresFiltroFinal > dado.valorInicial) {
          return false;
        }
      }

      return true;
    });

    this.dtOptions = {
      ajax: 'assets/contratos.json',
      language: {
        url: 'assets/datatables_language.json'
      },
      columns: [{
        title: '#',
        data: 'codigo'
      }, {
        title: 'Código',
        data: 'numero'
      }, {
        title: 'Número Contrato',
        data: 'contrato'
      }, {
        title: 'Número Licitação',
        data: 'licitacao'
      }, {
        title: 'Modalidade Licitação',
        data: 'modalidade'
      }, {
        title: 'Tipo de Contrato',
        data: 'tipo'
      }, {
        title: 'Objeto Contrato',
        data: 'objeto'
      }, {
        title: 'Favorecido',
        data: 'favorecido'
      }, {
        title: 'Valor Inicial',
        data: 'valorInicial',
        render: (data, type, row, meta) => {
          return parseFloat(data).toLocaleString();
        },
        className: 'dt-body-right'
      }], rowCallback: (row: Node, data: any[] | Contrato, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          (data as Contrato).chk = !(data as Contrato).chk;

          this.dtElement.dtInstance.then((dado) => {
            dado.data().each((contrato: Contrato, indice) => {
              if (indice !== index) {
                contrato.chk = false;
              }
            });
          });

          if ((data as Contrato).chk) {
            $('#dtContratos > tbody  > tr').each((tr) => {
              const linha = $('#dtContratos > tbody  > tr')[tr];
              $(linha).css('background-color', '');
            });
            this.contratoService.setLinhaSelecionada((data as Contrato));
            $(row).css('background-color', '#a3c3d6');
          } else {
            this.contratoService.setLinhaSelecionada(null);
            $(row).css('background-color', '');
          }
        });
        return row;
      }
    };
    this.subscriptionFiltro = this.contratoService.filtro.subscribe(
      (ft: Filtro) => {
        this.filtro = ft;
        this.filtrar();
      }
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.subscriptionFiltro.unsubscribe();
    this.dtTrigger.unsubscribe();
    // tslint:disable-next-line: no-string-literal
    $.fn['dataTable'].ext.search.pop();
  }

  filtrar() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

}
