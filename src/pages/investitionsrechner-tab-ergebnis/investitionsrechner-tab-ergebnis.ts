import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';
import { ModalInvestitionsrechnerPage } from '../modal-investitionsrechner/modal-investitionsrechner';
@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-ergebnis',
  templateUrl: 'investitionsrechner-tab-ergebnis.html',
})
export class InvestitionsrechnerTabErgebnisPage implements OnInit {

  private formData: FormGroup;

  // Deklaration und Initialisierung der grundlegenden Variablen für den Kapitalwert und die Amortisationszeit
  private jaehrlicheKostenVorInvestition: number = 0;
  private jaehrlicheEinsparungNachInvestition: number = 0;
  private kostenEndeNutzungNachInvestition: number = 0;
  
  private zinsFakor: number = 0;
  private nutzungsdauer: number = 0;
  private kapitalwert: number = 0;
  private amortisation: number = 0;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private investitionsrechnerService: InvestitionsrechnerProvider) {

    this.formData = this.formBuilder.group({
      kalkulatorischerZinsInputCheck: [],
      nutzungsdauerInputCheck: [],
    });
  }

  ngOnInit() {
    this.investitionsrechnerService.load();
    this.berechneErgebnisseAusVorherigenTabs();
  }

  private setkalkulatorischenZinsUndNutzungsdauertToProvider(kalkulatorischerZins, nutzungsdauer) {
    this.setKeyValueMappingToProvider('kalkulatorischerZins', kalkulatorischerZins);
    this.zinsFakor = this.investitionsrechnerService.getZinsfaktor();

    this.setKeyValueMappingToProvider('nutzungsdauer', nutzungsdauer);
    this.nutzungsdauer = this.investitionsrechnerService.getNutzungsdauer();

    this.berechneKapitalUndAmortisation();
  }

  private berechneErgebnisseAusVorherigenTabs() {
    // Tab 1 Ergebnisse 
    this.jaehrlicheKostenVorInvestition = this.investitionsrechnerService.berechneVerwertungskostenVorInvestition();
    this.jaehrlicheEinsparungNachInvestition = this.investitionsrechnerService.berechneJaehrlicheEinsparung();
    this.kostenEndeNutzungNachInvestition = this.investitionsrechnerService.berechneVerwertungskostenNachInvestition();
  }

  private berechneKapitalwert() {
    return -1 * this.jaehrlicheKostenVorInvestition + this.jaehrlicheEinsparungNachInvestition * ((Math.pow(this.zinsFakor, this.nutzungsdauer) - 1) / (Math.pow(this.zinsFakor, this.nutzungsdauer) * (this.zinsFakor - 1))) + this.kostenEndeNutzungNachInvestition / Math.pow(this.zinsFakor, this.nutzungsdauer);
  }

  private berechneAmortisation() {
    return Math.log(1 - this.jaehrlicheKostenVorInvestition * (this.zinsFakor - 1) / this.jaehrlicheEinsparungNachInvestition) / Math.log(1 / this.zinsFakor);
  }

  private setKeyValueMappingToProvider(key, value) {
    this.investitionsrechnerService.setKeyValueMappingToProvider(key, value);
  }

  private berechneKapitalUndAmortisation() {
    this.kapitalwert = this.berechneKapitalwert();
    this.amortisation = this.berechneAmortisation();

    // set Variables für Modal-Übergabe
    var jaehrlicheKostenVorInvestiton = this.jaehrlicheKostenVorInvestition;
    var jaehrlicheEinsparungNachInvestition = this.jaehrlicheEinsparungNachInvestition;
    var kostenEndeNutzungNachInvestition = this.kostenEndeNutzungNachInvestition;

    var kapitalwert = this.kapitalwert;
    var amortisation = this.amortisation;

    let ergInvestitionsrechner = {
      kapitalwert, amortisation
    };

    // Modal-Darstellung
    let modalPage = this.modalCtrl.create(ModalInvestitionsrechnerPage, {ergInvestitionsrechner: ergInvestitionsrechner})
    modalPage.present();
  }
}
