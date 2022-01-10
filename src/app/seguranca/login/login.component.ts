import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../shared/models/Usuario.model';
import { AuthService } from '../../shared/servicos/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;
  usuario!: Usuario;
  formSubmitted!: boolean;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario(): void {
    this.formularioLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  login(): void {
    if (this.formularioLogin.valid) {
      this.usuario = this.formularioLogin.value;
      this.authService.login(this.usuario.usuario, this.usuario.senha)
        .then(() => {
          this.router.navigate(['/clientes']);
        })
        .catch(() => {
          this.formularioLogin.get('senha')?.reset();
          this.messageService.add({
            severity: 'error',
            summary: `Erro ao logar`,
            detail: `Usuário ou senha inválidos`,
          });
        });
    } else {
      this.formSubmitted = true;
    }
  }

}
