import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { Subscription } from 'rxjs';
import { Contrato } from 'src/app/models/contrato';
import { Filtro } from './../../../models/filtro';

declare var $: any;

@Component({
  selector: 'app-detalhamento-contratos',
  templateUrl: './detalhamento-contratos.component.html',
  styleUrls: ['./detalhamento-contratos.component.scss']
})
export class DetalhamentoContratosComponent implements OnInit, OnDestroy {

  filtro: Filtro;
  subscription: Subscription;
  subscriptionFiltro: Subscription;
  contratos: Contrato[];
  contratosOriginal: Contrato[];

  constructor(
    private contratoService: ContratoService
  ) { }

  ngOnInit() {
    this.subscriptionFiltro = this.contratoService.filtro.subscribe(
      (ft: Filtro) => {
        this.filtro = ft;
        console.log(this.filtro);
        this.filtrar();
      }
    );
    this.subscription = this.contratoService.getContratos().subscribe(
      (retorno) => {
        this.contratos = retorno;
        this.contratosOriginal = retorno;
        $(document).ready(() => {
          $('#dtContratos').DataTable({
            language: {
              url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
          });

        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionFiltro.unsubscribe();
  }

  filtrar() {
    switch (this.filtro.tipo.toString()) {
      case '1':
        this.contratos = this.contratosOriginal.filter(x => x.codigo === parseInt(this.filtro.valorFiltro, 2));
        break;
      case '2':
        this.contratos = this.contratosOriginal.filter(x => x.contrato === parseInt(this.filtro.valorFiltro, 2));
        break;
    }
    $(document).ready(() => {
      $('#dtContratos').reload();

    });
  }

}
