import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvestitionsrechnerPage } from './investitionsrechner';

@NgModule({
  declarations: [
    InvestitionsrechnerPage,
  ],
  imports: [
    IonicPageModule.forChild(InvestitionsrechnerPage),
  ],
})
export class InvestitionsrechnerPageModule {}
