import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientesService} from "../../shared/servicos/clientes.service";
import {CepService} from "../../shared/servicos/cep.service";
import {ClienteDto} from "../../shared/models/ClienteDto.model";
import {TelefoneDto} from "../../shared/models/TelefoneDto.model";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  formulario!: FormGroup;
  formSubmitted!: boolean;

  emails: string[] = [];
  telefones: TelefoneDto[] = [];
  cliente: ClienteDto = new ClienteDto();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cepService: CepService,
    private clientesService: ClientesService) {
  }

  ngOnInit(): void {
    this.configurarFormulario();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.popularFormularioParaEdicao(id);
    }
  }

  salvar(): void {
    if (this.formulario.value) {
      this.configurarDto();
      this.clientesService.cadastrar(this.cliente).subscribe(() => {
        this.router.navigateByUrl('/clientes');
      });
    }
  }

  private configurarDto() {
    this.cliente.nome = this.formulario.controls['nome'].value;
    this.cliente.cpf = this.formulario.controls['cpf'].value;
    this.cliente.endereco = this.formulario.controls['endereco'].value;
    this.cliente.emails = this.emails;
    this.cliente.telefones = this.telefones;
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
      telefone: this.formBuilder.group(
        {
          tipoTelefone: [''],
          numeroTelefone: ['']
        })
    });
  }

  private popularFormularioParaEdicao(id: number): void {
    this.clientesService.buscarPorId(id).subscribe(contato => {
      this.formulario.patchValue({
        nome: contato.nome,
        cpf: contato.cpf,
        endereco: contato.endereco,
      });
      this.emails = contato.emails;
      this.telefones = contato.telefones;
    });
  }

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
    this.formulario.controls['email'].reset();
  }

  removerEmail(emailASerRemovido: string) {
    this.emails.splice(this.emails.indexOf(emailASerRemovido), 1);
  }

  addTelefone() {
    let telefoneDto: TelefoneDto;
    telefoneDto = this.formulario.controls['telefone'].value;
    this.telefones.push(telefoneDto);
    this.formulario.controls['telefone'].reset();
  }

  removerTelefone(telefoneASerRemovido: TelefoneDto) {
    this.telefones.splice(this.telefones.indexOf(telefoneASerRemovido), 1);
  }
}
