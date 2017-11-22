import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ModalInvestitionsrechnerPage } from '../modal-investitionsrechner/modal-investitionsrechner';

import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';
// import { ModalInvestitionsrechnerPage } from '../modal-investitionsrechner/modal-investitionsrechner';
@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-ergebnis',
  templateUrl: 'investitionsrechner-tab-ergebnis.html',
})
export class InvestitionsrechnerTabErgebnisPage implements OnInit {
  private ergebnis: FormGroup;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private investitionsService: InvestitionsrechnerProvider) { }

  ngOnInit() {
    this.investitionsService.load();
    this.buildForm();
  }

  ionViewWillEnter() {
    this.investitionsService.load();


    // // Tab Anlagen
    // console.log("Tab Anlagen: ");
    // let betriebsAltMaterial = this.investitionsService.getValueByKey('betriebsAltMaterial');
    // console.log("Investitionstab gefunden: " + betriebsAltMaterial);
    // var arrayStartwith = this.investitionsService.getValueStartsWith('betriebsAlt');
    // console.log("Investitionstab gefunden: " + arrayStartwith);
    // var summe = this.investitionsService.summiereAlleValuesStartsWith('betriebsAlt');

    // // Tab Investitionen
    // console.log("Tab Investition: ");
    // var summe2 = this.investitionsService.summiereAlleValuesStartsWith('betriebsInfraNeu');


    // Iteration über alternativen notwendig
    // forEach alternative Kapitalwert-Berechnung

    var alternativen = this.investitionsService.getAlternativen('alternativen');
    for (var indexOfArray in alternativen) {
      var alternative = alternativen[indexOfArray];
      for (var i = 0; i < alternative.length; i++) {
        var alternativeObjekt = alternative[i];
        for (var eigenschaft in alternativeObjekt) {
          if (alternativeObjekt.hasOwnProperty(eigenschaft)) {
            console.log("Alternative " + i + " " + eigenschaft + " = " + alternativeObjekt[eigenschaft]);
          }
        }
      }
    }

    // var alleAlternativen = this.investitionsService.getAllAlternativeValues();
    // console.log(alleAlternativen);
  }

  private buildForm() {
    this.ergebnis = this.fb.group({
      kalkulatorischerZins: [''],
      nutzungsdauer: ['']
    });
  }


  private submit(value) {
    this.setDataToProvider(value);
    // this.berechneKapitalUndAmortisationUndErstelleModal();
    this.createUndOpenModal();
  }

  private createUndOpenModal() {
    let modalPage = this.modalCtrl.create(ModalInvestitionsrechnerPage);
    modalPage.present();
  }

  private setDataToProvider(value) {
    this.investitionsService.setData(value);
  }
}