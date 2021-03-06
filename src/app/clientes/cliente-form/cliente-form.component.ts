import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientesService } from "../../shared/servicos/clientes.service";
import { CepService } from "../../shared/servicos/cep.service";
import { ClienteDto } from "../../shared/models/ClienteDto.model";
import { TelefoneDto } from "../../shared/models/TelefoneDto.model";
import { Observable, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit, OnDestroy, AfterContentChecked {

  formulario!: FormGroup;
  formSubmitted!: boolean;
  editando!: boolean;
  idCliente!: number;

  emails: string[] = [];
  telefones: TelefoneDto[] = [];
  cliente: ClienteDto = new ClienteDto();

  emailsObservable = new Observable(subscriber => subscriber.next(this.emails.length));
  telefonesObservable = new Observable(subscriber => subscriber.next(this.telefones.length));
  private emailsSubscription!: Subscription;
  private telefonesSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cepService: CepService,
    private clientesService: ClientesService,
    private messageService: MessageService) {
  }

  ngOnDestroy(): void {
    this.emailsSubscription.unsubscribe();
    this.telefonesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.configurarFormulario();
    this.idCliente = this.route.snapshot.params['id'];
    if (this.idCliente) {
      this.editando = true;
      this.popularFormularioParaEdicao(this.idCliente);
    }
  }

  ngAfterContentChecked(): void {
    this.validarEmail();
    this.validarTelefone();
  }

  salvar(): void {
    if (this.formulario.valid) {
      this.configurarDto();
      if (this.editando) {
        this.atualizar();
      } else {
        this.cadastrar();
      }
    }
    this.formSubmitted = true;
  }

  private cadastrar(): void {
    this.clientesService.cadastrar(this.cliente).subscribe(() => {
        this.messageService.add({severity: 'success', detail: 'Cliente cadastrado com sucesso!'});
        this.router.navigateByUrl('/clientes');
      },
      this.tratarErro()
    );
  }

  private atualizar(): void {
    this.clientesService.atualizar(this.idCliente, this.cliente).subscribe(() => {
        this.messageService.add({severity: 'success', detail: 'Cliente atualizado com sucesso!'});
        this.router.navigateByUrl('/clientes');
      },
      this.tratarErro());
  }

  private tratarErro(): (error: any) => void {
    return (error: any) => {
      error.error.params.forEach((invalidParam: any) => {
        this.messageService.add({
          severity: 'error',
          summary: `Erro ${error.error.detail}`,
          detail: `${invalidParam.param} ${invalidParam.message}`,
          life: 10000
        });
      });
    };
  }

  private configurarDto(): void {
    this.cliente.nome = this.formulario.controls['nome'].value;
    this.cliente.cpf = this.formulario.controls['cpf'].value;
    this.cliente.endereco = this.formulario.controls['endereco'].value;
    this.cliente.emails = this.emails;
    this.cliente.telefones = this.telefones;
  }

  private configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}')]],
      email: ['', [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, Validators.pattern('[0-9]{2}\\.[0-9]{3}-[0-9]{3}')]],
        uf: ['', Validators.required],
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        logradouro: ['', Validators.required],
        complemento: ['']
      }),
      telefone: this.formBuilder.group(
        {
          tipoTelefone: ['', [Validators.required]],
          numeroTelefone: ['', Validators.pattern('^\\(?[1-9]{2}\\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$')]
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

  consultarCep(): void {
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
    if (this.formulario.controls['email'].valid) {
      this.emails.push(this.formulario.controls['email'].value);
      this.formulario.controls['email'].reset();
    }

  }

  removerEmail(emailASerRemovido: string) {
    this.emails.splice(this.emails.indexOf(emailASerRemovido), 1);
  }

  addTelefone() {
    if (this.formulario.get('telefone.numeroTelefone')?.valid && this.formulario.get('telefone.tipoTelefone')?.valid) {
      let telefoneDto: TelefoneDto;
      telefoneDto = this.formulario.controls['telefone'].value;
      this.telefones.push(telefoneDto);
      this.formulario.controls['telefone'].reset();
    }
  }

  removerTelefone(telefoneASerRemovido: TelefoneDto) {
    this.telefones.splice(this.telefones.indexOf(telefoneASerRemovido), 1);
  }

  private validarEmail() {
    this.emailsSubscription = this.emailsObservable.subscribe(value => {
      if (value == 0) {
        this.formulario.controls['email'].addValidators([Validators.required,]);
      } else {
        this.formulario.controls['email'].removeValidators(Validators.required);
      }
      this.formulario.controls["email"].updateValueAndValidity();
    });
  }

  private validarTelefone() {
    this.telefonesSubscription = this.telefonesObservable.subscribe(value => {
      if (this.telefones.length == 0) {
        this.formulario.get('telefone.numeroTelefone')?.addValidators([Validators.required,]);
        this.formulario.get('telefone.tipoTelefone')?.addValidators([Validators.required,]);
      } else {
        this.formulario.get('telefone.numeroTelefone')?.removeValidators([Validators.required,]);
        this.formulario.get('telefone.tipoTelefone')?.removeValidators([Validators.required,]);
      }
      this.formulario.get('telefone.tipoTelefone')?.updateValueAndValidity();
      this.formulario.get('telefone.numeroTelefone')?.updateValueAndValidity();
    });
  }

  getMascaraTelefone(): string {
    if (this.formulario.get('telefone.tipoTelefone')?.value === 'CELULAR') {
      return "(99) 99999-9999";
    } else {
      return "(99) 9999-9999";
    }
  }
}
