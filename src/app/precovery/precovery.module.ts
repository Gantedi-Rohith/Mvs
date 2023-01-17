import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrecoveryPageRoutingModule } from './precovery-routing.module';

import { PrecoveryPage } from './precovery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrecoveryPageRoutingModule
  ],
  declarations: [PrecoveryPage]
})
export class PrecoveryPageModule {}
