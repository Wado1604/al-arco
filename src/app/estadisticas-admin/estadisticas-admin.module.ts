import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasAdminPageRoutingModule } from './estadisticas-admin-routing.module';

import { EstadisticasAdminPage } from './estadisticas-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticasAdminPageRoutingModule
  ],
  declarations: [EstadisticasAdminPage]
})
export class EstadisticasAdminPageModule {}
