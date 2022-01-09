import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListagemComponent } from './clientes-listagem/clientes-listagem.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesListagemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {
}
