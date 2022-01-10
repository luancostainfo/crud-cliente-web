import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ClientesService} from "../../shared/servicos/clientes.service";
import {CepService} from "../../shared/servicos/cep.service";
import {ClienteDto} from "../../shared/models/ClienteDto.model";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  formulario!: FormGroup;
  emails: string[] = [];
  cliente: ClienteDto = new ClienteDto();

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
    this.cliente.nome = this.formulario.controls['nome'].value;
    this.cliente.cpf = this.formulario.controls['cpf'].value;
    this.cliente.endereco = this.formulario.controls['endereco'].value;
    this.cliente.emails = this.emails;
  }

  private configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      email: [''],
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

  addEmail() {
    this.emails.push(this.formulario.controls['email'].value);
  }

  removerEmail(emailASerRemovido: string) {
    this.emails.splice(this.emails.indexOf(emailASerRemovido), 1);
  }
}
