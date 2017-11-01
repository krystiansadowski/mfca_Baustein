import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KostenstrukturrechnerPage } from './kostenstrukturrechner';
import { Component } from '@angular/core';

@NgModule({
  declarations: [
    KostenstrukturrechnerPage,
  ],
  imports: [
    IonicPageModule.forChild(KostenstrukturrechnerPage),
  ],
})
export class KostenstrukturrechnerPageModule {}
