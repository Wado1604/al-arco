import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PosicionesAdminPage } from './posiciones-admin.page';

describe('PosicionesAdminPage', () => {
  let component: PosicionesAdminPage;
  let fixture: ComponentFixture<PosicionesAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicionesAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
