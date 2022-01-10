import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oAuthTokenUrl = environment.TOKEN_URL;

  constructor(private http: HttpClient) {
  }

  login(usuario: string, senha: string): Observable<object> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic Y2xpZW50ZXMtd2ViOjEyMzQ1Ng==')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<object>(this.oAuthTokenUrl, body, {headers, withCredentials: true});
  }
}
