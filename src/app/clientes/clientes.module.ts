import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListagemComponent } from './clientes-listagem/clientes-listagem.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ClientesListagemComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class ClientesModule {
}
