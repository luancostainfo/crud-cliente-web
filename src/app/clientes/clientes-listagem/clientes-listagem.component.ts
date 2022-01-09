import {Component, OnInit} from '@angular/core';
import {ClientesService} from "../../shared/servicos/clientes.service";
import {ClienteResumido} from "../../shared/models/ClienteResumido.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-clientes-listagem',
  templateUrl: './clientes-listagem.component.html',
  styleUrls: ['./clientes-listagem.component.scss']
})
export class ClientesListagemComponent implements OnInit {

  clientes$!: Observable<ClienteResumido[]>;

  constructor(private clientesService: ClientesService) {
  }

  ngOnInit(): void {
    this.clientes$ = this.clientesService.listarTodos();
  }

}
