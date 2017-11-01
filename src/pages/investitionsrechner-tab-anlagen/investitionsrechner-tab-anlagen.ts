import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { InvestitionsrechnerTabInvestitionPage } from '../../pages/investitionsrechner-tab-investition/investitionsrechner-tab-investition';
import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';

@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-anlagen',
  templateUrl: 'investitionsrechner-tab-anlagen.html',
})
export class InvestitionsrechnerTabAnlagenPage {

  private formData: FormGroup;
  private kostenToPushToProvider: any = [];

  private materialKosten: number;



  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private tabs: Tabs,
    public investitionsrechnerService: InvestitionsrechnerProvider) {

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


    this.setKostenToProvider('betriebsAltMaterialKosten', betriebsAltAltMaterial);
    this.setKostenToProvider('betriebsAltBetriebundHilfstoffeKosten', betriebsAltBetriebundHilfstoffeKosten);
    this.setKostenToProvider('betriebsAltWartungKosten', betriebsAltWartungKosten);
    this.setKostenToProvider('betriebsAltEntsorgungKosten', betriebsAltEntsorgungKosten);
    this.setKostenToProvider('betriebsAltEnergieKosten', betriebsAltEnergieKosten);
    this.setKostenToProvider('betriebsAltWerkzeugKosten', betriebsAltWerkzeugKosten);
    this.setKostenToProvider('betriebsAltPersonalKosten', betriebsAltPersonalKosten);
    this.setKostenToProvider('betriebsAltRaumKosten', betriebsAltRaumKosten);
    this.setKostenToProvider('betriebsAltInstandsetzungKosten', betriebsAltInstandsetzungKosten);
    this.setKostenToProvider('betriebsAltRuestKosten', betriebsAltRuestKosten);
    this.setKostenToProvider('betriebsAltLagerKosten', betriebsAltLagerKosten);
    this.setKostenToProvider('betriebsAltSonstigebetriebsAltkosten', betriebsAltSonstigebetriebsAltkosten);
    this.setKostenToProvider('verwertungRueckbauKosten', verwertungRueckbauKosten);
    this.setKostenToProvider('verwertungRestwert', verwertungRestwert);
    this.setKostenToProvider('verwertungSonstigeVerwertungKosten', verwertungSonstigeVerwertungKosten);

    this.switchToTabWithData(1);

  }

  private switchToTabWithData(tabIndex) {
    this.tabs.select(tabIndex);
  }

  // Provider Methoden 
  private setKostenToProvider(kostenTyp, kostenValue) {
    this.investitionsrechnerService.setKostentraeger(kostenTyp, kostenValue);
  }
  
}
