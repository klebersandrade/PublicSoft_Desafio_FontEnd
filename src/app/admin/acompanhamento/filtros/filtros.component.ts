import { Component, OnInit, OnChanges, AfterViewChecked, DoCheck } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';

declare var $: any;


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {
  tipo: number;
  valorFiltro: string;
  situacao: number;
  valoresFiltroInicial: number;
  valoresFiltroFinal: number;
  datasFiltroInicial: string;
  datasFiltroFinal: string;
  situacaoVigente: string;
  situacaoVencimento: string;
  constructor(
    private contratoService: ContratoService
  ) { }

  ngOnInit() {
    this.inicializa();

    $.widget.bridge('uibutton', $.ui.button);

    $('#datasFiltroInicial').datepicker({
      autoclose: true,
      locale: 'pt-br',
      format: 'dd/mm/yyyy H:i',
    });
    $('#datasFiltroInicial').inputmask('99/99/9999', { placeholder: 'dd/mm/aaaa' });

    $('#datasFiltroFinal').datepicker({
      autoclose: true,
      locale: 'pt-br',
      format: 'dd/mm/yyyy H:i',
    });
    $('#datasFiltroFinal').inputmask('99/99/9999', { placeholder: 'dd/mm/aaaa' });

    $('#situacaoVigente').datepicker({
      autoclose: true,
      locale: 'pt-br',
      format: 'dd/mm/yyyy H:i',
    });
    $('#situacaoVigente').inputmask('99/99/9999', { placeholder: 'dd/mm/aaaa' });
  }


  aplicaFiltros() {
    this.datasFiltroInicial = $('#datasFiltroInicial').datepicker('getDate');
    this.datasFiltroFinal = $('#datasFiltroFinal').datepicker('getDate');
    this.situacaoVigente = $('#situacaoVigente').datepicker('getDate');

    this.contratoService.setFiltro({
      tipo: this.tipo,
      valorFiltro: this.valorFiltro,
      situacao: this.situacao,
      valoresFiltroInicial: this.valoresFiltroInicial,
      valoresFiltroFinal: this.valoresFiltroInicial,
      datasFiltroInicial: this.datasFiltroInicial,
      datasFiltroFinal: this.datasFiltroFinal,
      situacaoVigente: this.situacaoVigente,
      situacaoVencimento: this.situacaoVigente,
    });
  }

  inicializa() {
    this.tipo = 0;
    this.valorFiltro = '';
    this.situacao = 0;
    this.valoresFiltroInicial = 0.00;
    this.valoresFiltroFinal = 0.00;
    this.datasFiltroInicial = '';
    this.datasFiltroFinal = '';
    this.situacaoVigente = '';
    this.situacaoVencimento = '';
    $('#datasFiltroInicial').val('');
    $('#datasFiltroFinal').val('');
  }

  limpar() {
    this.inicializa();
  }
}
