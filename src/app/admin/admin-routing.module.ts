import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';

const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: 'acompanhamento', component: AcompanhamentoComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
