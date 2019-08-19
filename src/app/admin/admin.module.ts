import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ResumoContratosComponent } from './acompanhamento/resumo-contratos/resumo-contratos.component';
import { FiltrosComponent } from './acompanhamento/filtros/filtros.component';
import { DetalhamentoContratosComponent } from './acompanhamento/detalhamento-contratos/detalhamento-contratos.component';
import { GraficosComponent } from './acompanhamento/graficos/graficos.component';
import { NumberDirective } from '../directives/only-number.directive';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AcompanhamentoComponent,
    ResumoContratosComponent,
    FiltrosComponent,
    DetalhamentoContratosComponent,
    GraficosComponent,
    NumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    CurrencyMaskModule,
    NgbModule
  ]
})
export class AdminModule { }
