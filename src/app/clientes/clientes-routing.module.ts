import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientesListagemComponent} from './clientes-listagem/clientes-listagem.component';
import {ClienteDetalheComponent} from "./cliente-detalhe/cliente-detalhe.component";

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: ClientesListagemComponent},
      {path: 'detalhar/:id', component: ClienteDetalheComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {
}
