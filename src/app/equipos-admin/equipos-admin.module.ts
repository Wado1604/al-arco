import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EquiposAdminPageRoutingModule } from './equipos-admin-routing.module';
import { EquiposAdminPage } from './equipos-admin.page';
import { Routes } from '@angular/router';


@NgModule({
  imports:  [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposAdminPageRoutingModule,
  ],
  
  declarations: [EquiposAdminPage]
})
export class EquiposAdminPageModule {}
