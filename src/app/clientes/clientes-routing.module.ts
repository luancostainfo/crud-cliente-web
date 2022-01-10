import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientesListagemComponent} from './clientes-listagem/clientes-listagem.component';
import {ClienteDetalheComponent} from "./cliente-detalhe/cliente-detalhe.component";
import {ClienteFormComponent} from "./cliente-form/cliente-form.component";

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: ClientesListagemComponent},
      {path: 'novo', component: ClienteFormComponent},
      {path: 'detalhar/:id', component: ClienteDetalheComponent},
      {path: 'editar/:id', component: ClienteFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {
}
