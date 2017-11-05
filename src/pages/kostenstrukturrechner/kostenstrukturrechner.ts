import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ModalKostenstrukturrechnerPage } from '../../pages/modal-kostenstrukturrechner/modal-kostenstrukturrechner';
import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';

@IonicPage()
@Component({
  selector: 'page-kostenstrukturrechner',
  templateUrl: 'kostenstrukturrechner.html',
})
export class KostenstrukturrechnerPage {

  private formData: FormGroup;
  numberInputCheck: AbstractControl;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController) {

    // Formulardaten mittels eines Validators auf Richtigkeit überprufen
    this.formData = this.formBuilder.group({
      // materialInputCheck: ['', Validators.pattern("(\d+(\.\d+)?)")],
      materialInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")],
      energieInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")],
      handelswareInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")],
      lohnarbeitInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")],
      personalInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")],
      abschreibungInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")],
      instandhaltungInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")],
      mieteInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")],
      sonstigesInputCheck: ['', Validators.pattern("/^[0-9]+([,.][0-9]+)?$/")]
    })
  }

  public openModal(materialKosten, energieKosten, handelswarekosten,
    lohnkosten, personalkosten, abschreibungskosten,
    instandhaltungkosten, mietekosten, sonstigekosten) {
    let kosten = {
      materialKosten, energieKosten, handelswarekosten,
      lohnkosten, personalkosten, abschreibungskosten,
      instandhaltungkosten, mietekosten, sonstigekosten
    };
    let modalPage = this.modalCtrl.create(ModalKostenstrukturrechnerPage, kosten)

    modalPage.present();
  }
}
