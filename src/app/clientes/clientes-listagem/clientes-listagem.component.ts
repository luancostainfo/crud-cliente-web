import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-listagem',
  templateUrl: './clientes-listagem.component.html',
  styleUrls: ['./clientes-listagem.component.scss']
})
export class ClientesListagemComponent implements OnInit {

  numbers!: number[];

  constructor() {
  }

  ngOnInit(): void {
    this.numbers = Array(12).fill(0).map((x, i) => i);
  }

}
