import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { InvestitionsrechnerTabInvestitionPage } from '../../pages/investitionsrechner-tab-investition/investitionsrechner-tab-investition';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';
@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-anlagen',
  templateUrl: 'investitionsrechner-tab-anlagen.html',
})
export class InvestitionsrechnerTabAnlagenPage  implements OnInit{

  private anlagen: FormGroup;

  constructor(private fb: FormBuilder,
    private tabs: Tabs,
    private navCtrl: NavController,
    private investitionsService: InvestitionsrechnerProvider) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.anlagen = this.fb.group({
      betriebsAltMaterial: [''],
      betriebsAltBetriebundHilfstoffeKosten: [''],
      betriebsAltWartungKosten: [''],
      betriebsAltEntsorgungKosten: [''],
      betriebsAltEnergieKosten: [''],
      betriebsAltWerkzeugKosten: [''],
      betriebsAltPersonalKosten: [''],
      betriebsAltRaumKosten: [''],
      betriebsAltInstandsetzungKosten: [''],
      betriebsAltRuestKosten: [''],
      betriebsAltLagerKosten: [''],
      betriebsAltSonstigebetriebsAltkosten: [''],
      verwertungAltRueckbauKosten: [''],
      verwertungAltRestwert: [''],
      verwertungAltSonstigeVerwertungKosten: ['']
    })
  }

  private submit(value) {
    this.setDataToProvider(value);
    this.switchToTabIndex(1);
  }

  private switchToTabIndex(tabIndex) {
    this.tabs.select(tabIndex);
  }

  private setDataToProvider(value) {
    this.investitionsService.setData(value);
  }
}
