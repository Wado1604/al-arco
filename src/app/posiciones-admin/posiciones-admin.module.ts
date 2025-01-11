import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PosicionesAdminPageRoutingModule } from './posiciones-admin-routing.module';
import { PosicionesAdminPage } from './posiciones-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: PosicionesAdminPage }]),
  ],
  declarations: [PosicionesAdminPage],
})
export class PosicionesAdminPageModule {}
