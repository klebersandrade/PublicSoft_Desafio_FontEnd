import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContratoService } from './../../../services/contrato.service';
import { Subscription } from 'rxjs';
import { Contrato, getSumContratos, getDatasContratos } from 'src/app/models/contrato';

import * as moment from 'moment';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit, OnDestroy {
  valorTotal: number;
  porcConcluido: number;
  qtdDiasConcluido: number;
  comAditivo: string;
  dataInicial: Date;
  dataFinal: Date;
  chkRealizado: boolean;
  chkARealizar: boolean;
  public optChartValores = {
    scales: {
      xAxes: [{
        display: false, // this will remove all the x-axis grid lines
        ticks: {
          beginAtZero: true,
          steps: 100000,
          stepValue: 1000
        }
      }]
    },
    // scales: {
    //   yAxes: [{
    //     barThickness: 20,
    //     ticks: {
    //       beginAtZero: true,
    //       mirror: true,
    //     },
    //   }],
    // },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return 'R$ ' + Number(data.datasets[0].data[tooltipItem.index]).toFixed(2).replace(/./g, (c, i, a) => {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });
        }
      }
    },
    plugins: {
      labels: {
        // render: 'value',
        render: (args) => {
          // args will be something like:
          // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
          return 'R$ ' + Number(args.value).toFixed(2).replace(/./g, (c, i, a) => {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });

          // return object if it is image
          // return { src: 'image.png', width: 16, height: 16 };
        },
        fontSize: 12,
        fontStyle: 'bold'
      },
    },
    legend: {
      position: 'right',
      lineWidth: 200,
      labels: {
        usePointStyle: true,
        generateLabels: (chart) => {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, i) => {
              const meta = chart.getDatasetMeta(0);
              const ds = data.datasets[0];
              const arc = meta.data[i];
              const custom = arc && arc.custom || {};
              const getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
              const arcOpts = chart.options.elements.arc;
              let fill = custom.backgroundColor ? custom.backgroundColor :
                getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
              // let stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
              const stroke = '#e8e8e8';
              const bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

              // We get the value of the current label
              const value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];

              if (value === 0) {
                fill = '#e8e8e8';
              }

              return {
                // Instead of `text: label,`
                // We add the value to the string
                text: label, // + ' : ' + value,
                fillStyle: fill,
                strokeStyle: stroke,
                lineWidth: bw,
                fontColor: fill,
                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                index: i
              };
            });
          } else {
            return [];
          }
        }
      }
    },
    scaleShowVerticalLines: false,
    responsive: true,
    animation: {
      duration: 0.1,
      onComplete() {
        const chartInstance = this.chart;
        const ctx = chartInstance.ctx;
        const dataset = this.data.datasets[0];
        const meta = chartInstance.controller.getDatasetMeta(0);
        Chart.helpers.each(meta.data.forEach((bar, index) => {
          let label = dataset.data[index];
          if (label === 0) {
            return;
          }
          label = 'R$ ' + Number(label).toFixed(2).replace(/./g, (c, i, a) => {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });

          let labelWidth = ctx.measureText(label).width;
          labelWidth = bar._model.x - 5 - labelWidth;

          ctx.textBaseline = 'middle';
          ctx.textAlign = 'left';
          ctx.fillStyle = '#000000';
          ctx.strokeStyle = '#000000';
          ctx.font = '12pt';
          // ctx.fillText(label, labelWidth, bar._model.y);
          ctx.strokeText(label, labelWidth, bar._model.y);
        }));
      }
    }
  };
  public lbChartValores = ['Empenhado', 'A Empenhar', 'Liquidado', 'A Liquidar', 'Pago', 'A Pagar', 'A Pagar Geral'];
  public ctChartValores = 'horizontalBar';
  public lgChartValores = true;
  public dsChartValores = [
    { data: [30, 2, 33, 45, 66, 5, 6], backgroundColor: ['#deda6d', '#949141', '#529dcc', '#306282', '#6dbf7d', '#3f8c4e', '#274f2f'] }
  ];

  // Rosquinha
  public doughnutChartLabels = ['Inicial', 'Aditivo'];
  public doughnutChartData = [0, 0];
  public doughnutChartType = 'doughnut';
  public doughnutChartOptions = {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    responsive: true,
    scaleShowVerticalLines: false,
    plugins: {
      labels: {
        // render: 'value',
        render: (args) => {
          // args will be something like:
          // { label: 'Label', value: 123, percentage: 50, index: 0, dataset: {...} }
          return 'R$ ' + Number(args.value).toFixed(2).replace(/./g, (c, i, a) => {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });

          // return object if it is image
          // return { src: 'image.png', width: 16, height: 16 };
        },
        fontSize: 12,
        fontStyle: 'bold'
      },
    },
    legend: {
      position: 'bottom'
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return 'R$ ' + Number(data.datasets[0].data[tooltipItem.index]).toFixed(2).replace(/./g, (c, i, a) => {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });
        }
      }
    }
  };

  contratos: Contrato[];
  contrato: Contrato;
  subject: Subscription;
  subjectContratos: Subscription;
  constructor(
    private contratoService: ContratoService
  ) { }

  ngOnInit() {
    this.contrato = null;
    this.chkRealizado = true;
    this.chkARealizar = true;
    this.subjectContratos = this.contratoService.getContratos().subscribe(
      (contratos) => {
        this.contratos = contratos.data;
        this.genGraficos(null);
      }
    );
    this.subject = this.contratoService.rowSelect.subscribe(
      (contrato) => {
        this.genGraficos(contrato);
        this.contrato = contrato;
      }
    );
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
    this.subjectContratos.unsubscribe();
  }

  genGraficos(contrato: Contrato) {
    if (contrato === null) {
      const total = getSumContratos(this.contratos, 'valorInicial');
      const totalAditivo = getSumContratos(this.contratos, 'valorAditivo');
      if (totalAditivo > 0) {
        this.comAditivo = '(com aditivos)';
      }
      this.valorTotal = total + totalAditivo;
      this.doughnutChartLabels = ['Inicial', 'Aditivo'];
      this.doughnutChartData = [total, totalAditivo];

      const periodos = getDatasContratos(this.contratos);
      this.porcConcluido = (periodos.difDateAtual / periodos.difDateTotal * 100) / 100;
      this.qtdDiasConcluido = periodos.difDateAtual;

      this.dataInicial = periodos.minDate;
      this.dataFinal = periodos.maxDate;

      let porcDiv = parseInt((this.porcConcluido * 100).toString(), 10);
      if (porcDiv > 100) {
        porcDiv = 100;
      }

      $('#progressPeriodo').css('width', porcDiv + '%');
      $('#progressDiv').css('right', parseInt((105 - porcDiv).toString(), 10) + '%');

      let valorEmpenhado = getSumContratos(this.contratos, 'valorEmpenhado');
      let valorAEmpenhar = getSumContratos(this.contratos, 'valorAEmpenhar');
      let valorLiquidado = getSumContratos(this.contratos, 'valorLiquidado');
      let valorALiquidar = getSumContratos(this.contratos, 'valorALiquidar');
      let valorPago = getSumContratos(this.contratos, 'valorPago');
      let valorAPagar = getSumContratos(this.contratos, 'valorAPagar');
      let valorAPagarGeral = valorAPagar + valorALiquidar;

      if (!this.chkRealizado) {
        valorEmpenhado = 0;
        valorLiquidado = 0;
        valorPago = 0;
      }

      if (!this.chkARealizar) {
        valorAEmpenhar = 0;
        valorALiquidar = 0;
        valorAPagar = 0;
        valorAPagarGeral = 0;
      }

      this.dsChartValores = [
        {
          data: [valorEmpenhado, valorAEmpenhar, valorLiquidado, valorALiquidar, valorPago, valorAPagar, valorAPagarGeral],
          backgroundColor: ['#deda6d', '#949141', '#529dcc', '#306282', '#6dbf7d', '#3f8c4e', '#274f2f']
        }
      ];
    } else {
      const total = contrato.valorInicial;
      const totalAditivo = contrato.valorAditivo;
      if (totalAditivo > 0) {
        this.comAditivo = '(com aditivos)';
      }
      this.valorTotal = total + totalAditivo;
      this.doughnutChartLabels = ['Inicial', 'Aditivo'];
      this.doughnutChartData = [total, totalAditivo];

      const maxDate = moment(contrato.dataFinal);
      const minDate = moment(contrato.dataInicial);
      const difDateTotal = maxDate.diff(minDate, 'days');
      const difDateAtual = moment().diff(minDate, 'days');


      this.porcConcluido = (difDateAtual / difDateTotal * 100) / 100;
      this.qtdDiasConcluido = difDateAtual;

      this.dataInicial = contrato.dataInicial;
      this.dataFinal = contrato.dataFinal;
      let porcDiv = parseInt((this.porcConcluido * 100).toString(), 10);
      if (porcDiv > 100) {
        porcDiv = 100;
        this.porcConcluido = 1;
      }
      $('#progressPeriodo').css('width', porcDiv + '%');
      $('#progressDiv').css('right', parseInt((105 - porcDiv).toString(), 10) + '%');


      let valorEmpenhado = contrato.valorEmpenhado;
      let valorAEmpenhar = contrato.valorAEmpenhar;
      let valorLiquidado = contrato.valorLiquidado;
      let valorALiquidar = contrato.valorALiquidar;
      let valorPago = contrato.valorPago;
      let valorAPagar = contrato.valorAPagar;
      let valorAPagarGeral = valorAPagar + valorALiquidar;

      if (!this.chkRealizado) {
        valorEmpenhado = 0;
        valorLiquidado = 0;
        valorPago = 0;
      }

      if (!this.chkARealizar) {
        valorAEmpenhar = 0;
        valorALiquidar = 0;
        valorAPagar = 0;
        valorAPagarGeral = 0;
      }

      this.dsChartValores = [
        {
          data: [valorEmpenhado, valorAEmpenhar,
            valorLiquidado, valorALiquidar, valorPago,
            valorAPagar, valorAPagarGeral],
          backgroundColor: ['#deda6d', '#949141', '#529dcc', '#306282', '#6dbf7d', '#3f8c4e', '#274f2f']
        }
      ];
    }
  }

  chkRealizadoMudou() {
    this.genGraficos(this.contrato);
  }

  chkARealizarMudou() {
    this.genGraficos(this.contrato);
  }

}
