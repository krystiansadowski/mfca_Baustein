import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { KostenstrukturrechnerPage } from '../kostenstrukturrechner/kostenstrukturrechner';
import { InvestitionsrechnerPage } from '../investitionsrechner/investitionsrechner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private kostenstrukturRechner = KostenstrukturrechnerPage;
  private investitionsRechner =  InvestitionsrechnerPage;

  constructor(private navCtrl: NavController) {

  }

  onLink(url: string){
    window.open(url);
  }
}
