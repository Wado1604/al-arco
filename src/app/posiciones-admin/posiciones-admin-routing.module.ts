import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosicionesAdminPage } from './posiciones-admin.page';

const routes: Routes = [
  {
    path: '',
    component: PosicionesAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosicionesAdminPageRoutingModule {}
