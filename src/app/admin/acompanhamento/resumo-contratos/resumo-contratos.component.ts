import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContratoService } from './../../../services/contrato.service';
import { Subscription } from 'rxjs';
import { Contrato } from './../../../models/contrato';

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
  valorTotal: number;
  valorEmpenhados: number;
  subscription: Subscription;
  constructor(
    private contratoService: ContratoService
  ) { }

  ngOnInit() {
    this.subscription = this.contratoService.getContratos().subscribe(
      (retorno) => {
        this.GetTotais(retorno);
      },
      (error) => {
        alert('Erro ao carregar contratos \n' + error);
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
    this.qtdContratosVencidos = this.qtdContratos - this.qtdContratosVigente;

    this.valorTotal = 0;
    this.valorEmpenhados = 0;
    contratos.forEach(contrato => {
      this.valorTotal += contrato.valorInicial;
      this.valorEmpenhados += contrato.valorEmpenhado;
    });
  }

}
