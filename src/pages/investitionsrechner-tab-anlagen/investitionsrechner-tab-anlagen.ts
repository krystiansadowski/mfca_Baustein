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
      betriebsHilfstoffeInputCheck: [],
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

  private pushValuesToInvestitionrechnerProvider(
    material:number, betriebsBetriebundHilfstoffeKosten, betriebsWartungKosten,
    betriebsEntsorgungKosten, betriebsEnergieKosten, betriebsWerkzeugKosten,
    betriebsPersonalKosten, betriebsRaumKosten, betriebsInstandsetzungKosten,
    betriebsRuestKosten, betriebsLagerKosten, betriebsSonstigebetriebskosten,
    verwertungRueckbauKosten, verwertungRestwert, verwertungSonstigeVerwertungKosten) {


    this.setKostenToProvider('betriebsMaterialKosten', material);
    this.setKostenToProvider('betriebsBetriebundHilfstoffeKosten', betriebsBetriebundHilfstoffeKosten);
    this.setKostenToProvider('betriebsWartungKosten', betriebsWartungKosten);
    this.setKostenToProvider('betriebsEntsorgungKosten', betriebsEntsorgungKosten);
    this.setKostenToProvider('betriebsEnergieKosten', betriebsEnergieKosten);
    this.setKostenToProvider('betriebsWerkzeugKosten', betriebsWerkzeugKosten);
    this.setKostenToProvider('betriebsPersonalKosten', betriebsPersonalKosten);
    this.setKostenToProvider('betriebsRaumKosten', betriebsRaumKosten);
    this.setKostenToProvider('betriebsInstandsetzungKosten', betriebsInstandsetzungKosten);
    this.setKostenToProvider('betriebsRuestKosten', betriebsRuestKosten);
    this.setKostenToProvider('betriebsLagerKosten', betriebsLagerKosten);
    this.setKostenToProvider('betriebsSonstigebetriebskosten', betriebsSonstigebetriebskosten);
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
