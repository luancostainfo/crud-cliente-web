import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oAuthTokenUrl = environment.TOKEN_URL;
  private jwtPayload: any;

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic Y2xpZW50ZXMtd2ViOjEyMzQ1Ng==')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.oAuthTokenUrl, body, {headers})
      .toPromise()
      .then(response => {
        console.log(response);
        // @ts-ignore
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(response);
      });
  }

  private armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
