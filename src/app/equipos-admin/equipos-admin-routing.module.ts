import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquiposAdminPage } from './equipos-admin.page';

const routes: Routes = [
  {
    path: '',
    component: EquiposAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposAdminPageRoutingModule {}
