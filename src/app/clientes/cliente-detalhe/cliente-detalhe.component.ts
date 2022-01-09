import {Component, OnInit} from '@angular/core';
import {ClienteDto} from "../../shared/models/ClienteDto.model";
import {ActivatedRoute} from "@angular/router";
import {ClientesService} from "../../shared/servicos/clientes.service";

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss']
})
export class ClienteDetalheComponent implements OnInit {

  cliente!: ClienteDto;

  constructor(
    private route: ActivatedRoute,
    private clientesService: ClientesService) {
  }

  ngOnInit(): void {
    this.clientesService.buscarPorId(this.route.snapshot.params['id']).subscribe(cliente => this.cliente = cliente);
  }
}
