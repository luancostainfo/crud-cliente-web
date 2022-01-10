import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRenokeUrl = environment.LOGOUT_URL;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  logout(): any {
    return this.http.delete(this.tokensRenokeUrl, {withCredentials: true})
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }
}
