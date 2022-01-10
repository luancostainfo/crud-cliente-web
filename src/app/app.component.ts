import { Component } from '@angular/core';
import { AuthService } from './shared/servicos/auth.service';
import { Router } from '@angular/router';
import { LogoutService } from './shared/servicos/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService,
              private router: Router,
              private logoutService: LogoutService) {
  }

  logout(): void {
    this.logoutService.logout().then(() => this.router.navigateByUrl('/login'));
  }

  exibirMenu(): boolean {
    return this.router.url !== '/login';
  }
}
