import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClienteResumido} from "../models/ClienteResumido.model";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API_URL = environment.API_URL + '/clientes';

  constructor(private http: HttpClient) {
  }

  listarTodos(): Observable<ClienteResumido[]> {
    return this.http.get<ClienteResumido[]>(this.API_URL);
  }
}
