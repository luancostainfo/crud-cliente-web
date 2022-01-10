import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),
  ],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
