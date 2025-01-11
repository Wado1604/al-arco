import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('user');
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
    }
    return isAuthenticated;
  }
  
}


