import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear un mock para el Router
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }, // Inyectar el mock del Router
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is authenticated', () => {
    // Simula que el usuario está autenticado
    spyOn(localStorage, 'getItem').and.returnValue('test@example.com');

    const canActivate = guard.canActivate();
    expect(canActivate).toBeTrue(); // Debe permitir el acceso
  });

  it('should block activation if user is not authenticated', () => {
    // Simula que el usuario no está autenticado
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const canActivate = guard.canActivate();
    expect(canActivate).toBeFalse(); // Debe bloquear el acceso
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']); // Redirige a login
  });
  
});



