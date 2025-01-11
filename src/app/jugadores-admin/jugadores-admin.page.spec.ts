import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadoresAdminPage } from './jugadores-admin.page';

describe('JugadoresAdminPage', () => {
  let component: JugadoresAdminPage;
  let fixture: ComponentFixture<JugadoresAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
