import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientesListagemComponent} from './clientes-listagem/clientes-listagem.component';
import {ClienteDetalheComponent} from "./cliente-detalhe/cliente-detalhe.component";
import {ClienteFormComponent} from "./cliente-form/cliente-form.component";
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: '',
        component: ClientesListagemComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_VISUALIZAR_CLIENTE']}
      },
      {
        path: 'novo',
        component: ClienteFormComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_CADASTRAR_CLIENTE']}
      },
      {
        path: 'detalhar/:id',
        component: ClienteDetalheComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_VISUALIZAR_CLIENTE']}
      },
      {
        path: 'editar/:id',
        component: ClienteFormComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ALTERAR_CLIENTE']}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {
}
