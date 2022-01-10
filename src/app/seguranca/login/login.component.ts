import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../../shared/models/Usuario.model';
import { AuthService } from '../../shared/servicos/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;
  usuario!: Usuario;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
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
    this.usuario = Object.assign({}, this.formularioLogin.value, this.usuario);
    this.authService.login(this.usuario.usuario, this.usuario.senha).subscribe(value => console.log(value));
  }

}
