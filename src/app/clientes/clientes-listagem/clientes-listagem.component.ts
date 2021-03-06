import { Component, OnInit } from '@angular/core';
import { ClientesService } from "../../shared/servicos/clientes.service";
import { ClienteResumido } from "../../shared/models/ClienteResumido.model";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthService } from '../../shared/servicos/auth.service';

@Component({
  selector: 'app-clientes-listagem',
  templateUrl: './clientes-listagem.component.html',
  styleUrls: ['./clientes-listagem.component.scss']
})
export class ClientesListagemComponent implements OnInit {

  clientes: ClienteResumido[] = [];

  constructor(private clientesService: ClientesService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              public auth: AuthService) {
  }

  ngOnInit(): void {
    this.listarClientes();
  }

  confirmarExclusao(id: number): void {
    this.confirmationService.confirm({
      message: 'Você realmente quer excluir esse cliente?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(id);
        this.messageService.add({
          severity: 'success',
          summary: 'Operação executada com sucesso!',
          detail: `Cliente de ID ${id} excluído com sucesso!`
        });
      }
    });
  }

  private listarClientes(): void {
    this.clientesService.listarTodos().subscribe(
      clientes => this.clientes = clientes,
      error => this.messageService.add({
        severity: 'error',
        summary: `Erro ${error.detail}`,
        detail: `Não foi possível buscar os clientes da API, tente novamente mais tarde.`
      })
    );
  }

  private excluir(id: number): void {
    this.clientesService.excluir(id).subscribe(() => {
      this.listarClientes();
    });
  }
}
