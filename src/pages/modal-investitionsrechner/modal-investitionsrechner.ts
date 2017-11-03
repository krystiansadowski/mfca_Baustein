import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-investitionsrechner',
  templateUrl: 'modal-investitionsrechner.html',
})
export class ModalInvestitionsrechnerPage {

  private ergInvestitionsrechner = [];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController) {
  }


  private getKostentraegerValueAusForm(kostentraeger: string) {
    let kostentraegerValue = parseFloat(this.navParams.get(kostentraeger));

    if (isNaN(kostentraegerValue)) {
      // kostentraegerValue = 0
      return kostentraegerValue = 0;
    }
    else {
      return kostentraegerValue;
    }
  }

  // Methode zum Schliessen des Modalds
  private closeModal() {
    this.viewCtrl.dismiss();
  }

}
