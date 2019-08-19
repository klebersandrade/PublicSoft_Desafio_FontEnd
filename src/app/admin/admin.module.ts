import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ResumoContratosComponent } from './acompanhamento/resumo-contratos/resumo-contratos.component';
import { FiltrosComponent } from './acompanhamento/filtros/filtros.component';
import { DetalhamentoContratosComponent } from './acompanhamento/detalhamento-contratos/detalhamento-contratos.component';
import { GraficosComponent } from './acompanhamento/graficos/graficos.component';

@NgModule({
  declarations: [
    AcompanhamentoComponent,
    ResumoContratosComponent,
    FiltrosComponent,
    DetalhamentoContratosComponent,
    GraficosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
