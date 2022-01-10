import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../../shared/models/Usuario.model';
import { AuthService } from '../../shared/servicos/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;
  usuario!: Usuario;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario(): void {
    this.formularioLogin = this.formBuilder.group({
      usuario: [''],
      senha: ['']
    });
  }

  login(): void {
    this.usuario = this.formularioLogin.value;
    this.authService.login(this.usuario.usuario, this.usuario.senha)
      .then(() => {
        this.router.navigate(['/clientes']);
      })
      .catch(erro => {
        this.formularioLogin.get('senha')?.reset();
        console.log(erro);
      });
  }

}
