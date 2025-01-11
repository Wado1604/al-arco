import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadoresAdminPageRoutingModule } from './jugadores-admin-routing.module';

import { JugadoresAdminPage } from './jugadores-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadoresAdminPageRoutingModule
  ],
  declarations: [JugadoresAdminPage]
})
export class JugadoresAdminPageModule {}
