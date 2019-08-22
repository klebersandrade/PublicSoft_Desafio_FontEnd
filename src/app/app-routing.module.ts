import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DetalhamentoContratosComponent } from './admin/acompanhamento/detalhamento-contratos/detalhamento-contratos.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  { path: 'detalheFullPage', component: DetalhamentoContratosComponent, data: {fullPage: true} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
