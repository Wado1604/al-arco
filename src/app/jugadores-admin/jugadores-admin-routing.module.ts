import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresAdminPage } from './jugadores-admin.page';

const routes: Routes = [
  {
    path: '',
    component: JugadoresAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresAdminPageRoutingModule {}
