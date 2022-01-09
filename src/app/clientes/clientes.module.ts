import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientesRoutingModule} from './clientes-routing.module';
import {ClientesListagemComponent} from './clientes-listagem/clientes-listagem.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from "primeng/divider";
import {ClienteDetalheComponent} from "./cliente-detalhe/cliente-detalhe.component";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ClientesListagemComponent,
    ClienteDetalheComponent,
    ClienteFormComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    CardModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    InputMaskModule,
    RippleModule,
    DropdownModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule {
}
