import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrato } from './../models/contrato';
import { Filtro } from './../models/filtro';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  @Output() filtro = new EventEmitter<Filtro>();
  @Output() rowSelect = new EventEmitter<Contrato>();
  contratosUrl = 'assets/contratos.json';
  constructor(
    private http: HttpClient
  ) {
  }

  getContratos() {
    return this.http.get<any>(this.contratosUrl);
  }


  setFiltro(filtro: Filtro) {
    this.filtro.emit(filtro);
  }

  setLinhaSelecionada(contrato: Contrato) {
    this.rowSelect.emit(contrato);
  }
}
