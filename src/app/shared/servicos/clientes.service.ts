import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {ClienteResumido} from "../models/ClienteResumido.model";
import {ClienteDto} from "../models/ClienteDto.model";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API_URL = environment.API_URL + '/clientes';

  constructor(private http: HttpClient) {
  }

  listarTodos(): Observable<ClienteResumido[]> {
    return this.http.get<ClienteResumido[]>(this.API_URL).pipe(take(1));
  }

  buscarPorId(id: number): Observable<ClienteDto> {
    return this.http.get<ClienteDto>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  cadastrar(cliente: ClienteDto): Observable<ClienteDto> {
    return this.http.post<ClienteDto>(this.API_URL, cliente).pipe(take(1));
  }
}
