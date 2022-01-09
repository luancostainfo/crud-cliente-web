import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesListagemComponent } from './clientes-listagem.component';

describe('ClientesListagemComponent', () => {
  let component: ClientesListagemComponent;
  let fixture: ComponentFixture<ClientesListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
