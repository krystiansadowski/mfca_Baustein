import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { InvestitionsrechnerTabInvestitionPage } from '../../pages/investitionsrechner-tab-investition/investitionsrechner-tab-investition';
import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-anlagen',
  templateUrl: 'investitionsrechner-tab-anlagen.html',
})
export class InvestitionsrechnerTabAnlagenPage implements OnInit {

  private anlagen: FormGroup;

  constructor(private fb: FormBuilder,
    private tabs: Tabs) { }

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
      verwertungRueckbauKosten: [''],
      verwertungRestwert: [''],
      verwertungSonstigeVerwertungKosten: ['']
    })
  }

  private submit(value) {
    console.log(value);
    this.switchToTabIndex(1);
  }

  private switchToTabIndex(tabIndex) {
    this.tabs.select(tabIndex);
  }
}
