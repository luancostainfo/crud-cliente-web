import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ClientesService} from "../../shared/servicos/clientes.service";
import {CepService} from "../../shared/servicos/cep.service";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  formulario!: FormGroup;
  // telefones!: TelefoneDto[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cepService: CepService,
    private clientesService: ClientesService) {
  }

  ngOnInit(): void {
    this.configurarFormulario();

  }

  salvar(): void {

  }

  private configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      endereco: this.formBuilder.group({
        cep: [''],
        uf: [''],
        cidade: [''],
        bairro: [''],
        logradouro: [''],
        complemento: ['']
      }),
      // telefones: [this.getTelefones()]
    });
  }

  // private getTelefones(): TelefoneDto[] {
  //   return [
  //     {tipoTelefone: 'COMERCIAL', numero: '(61) 3359-5684'},
  //     {tipoTelefone: 'CELULAR', numero: '(61) 3359-5684'},
  //     {tipoTelefone: 'RESIDENCIAL', numero: '(61) 3359-5684'}
  //   ];
  // }


  consultarCep() {
    const cep = this.formulario.get('endereco.cep')?.value;
    console.log('cep aqui', cep);
    if (cep != null && cep !== '') {
      this.cepService.consultarCep(cep).subscribe(dados => {
        this.populaDadosDeEndereco(dados);
      });
    }
  }

  private populaDadosDeEndereco(dados: any): void {
    this.formulario.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        complemento: dados.complemento,
        cidade: dados.localidade,
        uf: dados.uf
      }
    });
  }
}
