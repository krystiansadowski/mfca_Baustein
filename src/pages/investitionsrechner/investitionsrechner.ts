import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InvestitionsrechnerTabAnlagenPage } from '../investitionsrechner-tab-anlagen/investitionsrechner-tab-anlagen';
import { InvestitionsrechnerTabInvestitionPage } from '../investitionsrechner-tab-investition/investitionsrechner-tab-investition';
import { InvestitionsrechnerTabErgebnisPage } from '../investitionsrechner-tab-ergebnis/investitionsrechner-tab-ergebnis';

@IonicPage()
@Component({
  selector: 'page-investitionsrechner',
  templateUrl: 'investitionsrechner.html',


})

export class InvestitionsrechnerPage {
  
  private tab1root;
  private tab2root;
  private tab3root;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initTabPages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvestitionsrechnerPage');
  }

  private initTabPages() {
    this.tab1root = InvestitionsrechnerTabAnlagenPage;
    this.tab2root = InvestitionsrechnerTabInvestitionPage;
    this.tab3root = InvestitionsrechnerTabErgebnisPage;
  }
}
