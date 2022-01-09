import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientesRoutingModule} from './clientes-routing.module';
import {ClientesListagemComponent} from './clientes-listagem/clientes-listagem.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from "primeng/divider";
import {ClienteDetalheComponent} from "./cliente-detalhe/cliente-detalhe.component";


@NgModule({
  declarations: [
    ClientesListagemComponent,
    ClienteDetalheComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    CardModule,
    ButtonModule,
    DividerModule
  ]
})
export class ClientesModule {
}
