import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrato } from './../models/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  contratosUrl = 'assets/contratos.json';
  constructor(
    private http: HttpClient
  ) { }


  getContratos() {
    return this.http.get<Contrato[]>(this.contratosUrl);
  }
}
