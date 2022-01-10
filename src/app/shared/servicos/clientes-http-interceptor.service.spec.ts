import { TestBed } from '@angular/core/testing';

import { ClientesHttpInterceptorService } from './clientes-http-interceptor.service';

describe('ClientesHttpInterceptorService', () => {
  let service: ClientesHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
