import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurancaRoutingModule {
}
