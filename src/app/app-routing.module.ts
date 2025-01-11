import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule) },
  { path: 'partidos', loadChildren: () => import('./partidos/partidos.module').then(m => m.PartidosPageModule) },
  { path: 'equipos-admin', loadChildren: () => import('./equipos-admin/equipos-admin.module').then(m => m.EquiposAdminPageModule) },
  { path: 'estadisticas-admin', loadChildren: () => import('./estadisticas-admin/estadisticas-admin.module').then(m => m.EstadisticasAdminPageModule) },
  { path: 'jugadores-admin', loadChildren: () => import('./jugadores-admin/jugadores-admin.module').then(m => m.JugadoresAdminPageModule) },
  { path: 'posiciones-admin', loadChildren: () => import('./posiciones-admin/posiciones-admin.module').then(m => m.PosicionesAdminPageModule) },
  {
    path: '**',
    redirectTo: 'login', // Ruta 404 por defecto
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule),
  },
  {
    path: 'partidos',
    loadChildren: () => import('./partidos/partidos.module').then(m => m.PartidosPageModule),
  },
  {
    path: 'equipos-admin',
    loadChildren: () =>
      import('./equipos-admin/equipos-admin.module').then(
        (m) => m.EquiposAdminPageModule
      ),
  },
 
  {
    path: 'posiciones-admin',
    loadChildren: () => import('./posiciones-admin/posiciones-admin.module').then(m => m.PosicionesAdminPageModule),
    canActivate: [AuthGuard] // Si tienes un guard, verifica su lógica.
  },
  {
    path: 'jugadores-admin',
    loadChildren: () =>
      import('./jugadores-admin/jugadores-admin.module').then(
        (m) => m.JugadoresAdminPageModule
      ),
  },
  {
    path: 'estadisticas-admin',
    loadChildren: () =>
      import('./estadisticas-admin/estadisticas-admin.module').then(
        (m) => m.EstadisticasAdminPageModule
      ),
  },
  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
