import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { InvestitionsrechnerTabInvestitionPage } from '../../pages/investitionsrechner-tab-investition/investitionsrechner-tab-investition';
import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';

@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-anlagen',
  templateUrl: 'investitionsrechner-tab-anlagen.html',
})
export class InvestitionsrechnerTabAnlagenPage {

  private formData: FormGroup;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private tabs: Tabs,
    private investitionsrechnerService: InvestitionsrechnerProvider) {

    this.investitionsrechnerService.load();

    this.formData = this.formBuilder.group({
      materialInputCheck: [],
      betriebsAltHilfstoffeInputCheck: [],
      wartungsInputCheck: [],
      entsorgungsInputCheck: [],
      energieInputCheck: [],
      werkzeugInputCheck: [],
      personalInputCheck: [],
      raumInputCheck: [],
      instandhaltungInputCheck: [],
      ruestInputCheck: [],
      lagerInputCheck: [],
      sonstigeInputCheck: [],
      rueckbauInputCheck: [],
      restwertInputCheck: [],
      verwertungSonstigeKostenInputCheck: []
    });
  }

  private pushValuesToInvestitionrechnerProviderUndWechselZumTabZwei(
    betriebsAltAltMaterial:number, betriebsAltBetriebundHilfstoffeKosten, betriebsAltWartungKosten,
    betriebsAltEntsorgungKosten, betriebsAltEnergieKosten, betriebsAltWerkzeugKosten,
    betriebsAltPersonalKosten, betriebsAltRaumKosten, betriebsAltInstandsetzungKosten,
    betriebsAltRuestKosten, betriebsAltLagerKosten, betriebsAltSonstigebetriebsAltkosten,
    verwertungRueckbauKosten, verwertungRestwert, verwertungSonstigeVerwertungKosten) {

    this.setKeyValueMappingToProvider('betriebsAltMaterialKosten', betriebsAltAltMaterial);
    this.setKeyValueMappingToProvider('betriebsAltBetriebundHilfstoffeKosten', betriebsAltBetriebundHilfstoffeKosten);
    this.setKeyValueMappingToProvider('betriebsAltWartungKosten', betriebsAltWartungKosten);
    this.setKeyValueMappingToProvider('betriebsAltEntsorgungKosten', betriebsAltEntsorgungKosten);
    this.setKeyValueMappingToProvider('betriebsAltEnergieKosten', betriebsAltEnergieKosten);
    this.setKeyValueMappingToProvider('betriebsAltWerkzeugKosten', betriebsAltWerkzeugKosten);
    this.setKeyValueMappingToProvider('betriebsAltPersonalKosten', betriebsAltPersonalKosten);
    this.setKeyValueMappingToProvider('betriebsAltRaumKosten', betriebsAltRaumKosten);
    this.setKeyValueMappingToProvider('betriebsAltInstandsetzungKosten', betriebsAltInstandsetzungKosten);
    this.setKeyValueMappingToProvider('betriebsAltRuestKosten', betriebsAltRuestKosten);
    this.setKeyValueMappingToProvider('betriebsAltLagerKosten', betriebsAltLagerKosten);
    this.setKeyValueMappingToProvider('betriebsAltSonstigebetriebsAltkosten', betriebsAltSonstigebetriebsAltkosten);
    this.setKeyValueMappingToProvider('verwertungsRueckbauKosten', verwertungRueckbauKosten);
    this.setKeyValueMappingToProvider('verwertungsRestwert', verwertungRestwert);
    this.setKeyValueMappingToProvider('verwertungsSonstigeVerwertungKosten', verwertungSonstigeVerwertungKosten);

    this.switchToTabIndex(1);

  }

  private setKeyValueMappingToProvider(key, value) {
    this.investitionsrechnerService.setKeyValueMappingToProvider(key, value);
  }

  private switchToTabIndex(tabIndex) {
    this.tabs.select(tabIndex);
  }  
}
