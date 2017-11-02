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

  // Grundlegende Variablen für die Berechnung des Kapitalwerts und der Amortisationszeit
  private jaehrlicheKostenVorInvestition: number = 0;
  private alleVerwertungskostenVorInvestition: number = 0;
  private beschaffungsUndInfrastrukturKosten: number = 0;
  private jaehrlicheKostenNachInvestition: number = 0;
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
    this.loadErgebnisseAusVorherigenTabs();

    this.kapitalwert = this.berechneKapitalwert();
    this.amortisation = this.berechneAmortisation();
  }

  private berechneInvestition(kalkulatorischerZins, nutzungsdauer) {
    this.setKostenToProvider('kalkulatorischerZins', kalkulatorischerZins);
    this.setKostenToProvider('nutzungsdauer', nutzungsdauer);

    this.zinsFakor = this.investitionsrechnerService.getZinsfaktor();
    this.nutzungsdauer = this.investitionsrechnerService.getNutzungsdauer();

    this.kapitalwert = this.berechneKapitalwert();
    this.amortisation = this.berechneAmortisation();
  }

  private loadErgebnisseAusVorherigenTabs() {
    // Tab 1 Ergebnisse 
    this.jaehrlicheKostenVorInvestition = this.investitionsrechnerService.sumAlleKostentraegerWerteStartsWith('betriebsAlt');
    this.alleVerwertungskostenVorInvestition = this.investitionsrechnerService.berechneVerwertungskostenVorInvestition();

    // Tab 2 Ergebnisse
    this.beschaffungsUndInfrastrukturKosten = this.investitionsrechnerService.sumAlleKostentraegerWerteStartsWith('betriebsInfraNeu');
    this.jaehrlicheKostenNachInvestition = this.investitionsrechnerService.sumAlleKostentraegerWerteStartsWith('betriebsNeu');
    this.jaehrlicheEinsparungNachInvestition = this.jaehrlicheKostenVorInvestition - this.jaehrlicheKostenNachInvestition;
    this.kostenEndeNutzungNachInvestition = this.investitionsrechnerService.berechneVerwertungskostenNachInvestition();
  }

  private berechneKapitalwert() {
    return -1 * this.jaehrlicheKostenVorInvestition + this.jaehrlicheEinsparungNachInvestition * ((Math.pow(this.zinsFakor, this.nutzungsdauer) - 1) / (Math.pow(this.zinsFakor, this.nutzungsdauer) * (this.zinsFakor - 1))) + this.kostenEndeNutzungNachInvestition / Math.pow(this.zinsFakor, this.nutzungsdauer);
  }

  private berechneAmortisation() {
    return Math.log(1 - this.jaehrlicheKostenVorInvestition * (this.zinsFakor - 1) / this.jaehrlicheEinsparungNachInvestition) / Math.log(1 / this.zinsFakor);
  }

  private setKostenToProvider(kostenTyp, kostenValue) {
    this.investitionsrechnerService.setKostentraeger(kostenTyp, kostenValue);
  }

  private openModal() {
    var jaehrlicheKostenVorInvestiton = this.jaehrlicheKostenVorInvestition;
    var alleVerwertungskostenVorInvestition = this.alleVerwertungskostenVorInvestition;
    var beschaffungsUndInfrastrukturKosten = this.beschaffungsUndInfrastrukturKosten;
    var jaehrlicheKostenNachInvestition = this.jaehrlicheKostenNachInvestition;
    var jaehrlicheEinsparungNachInvestition = this.jaehrlicheEinsparungNachInvestition;
    var kostenEndeNutzungNachInvestition = this.kostenEndeNutzungNachInvestition;
    var kapitalwert = this.kapitalwert;
    var amortisation = this.amortisation;

    let kosten = {
      jaehrlicheKostenVorInvestiton, alleVerwertungskostenVorInvestition, beschaffungsUndInfrastrukturKosten,
      jaehrlicheKostenNachInvestition, jaehrlicheEinsparungNachInvestition, kostenEndeNutzungNachInvestition,
      kapitalwert, amortisation
    };
    let modalPage = this.modalCtrl.create(ModalInvestitionsrechnerPage)

    modalPage.present()
  }
}
