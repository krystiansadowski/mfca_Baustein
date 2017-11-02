import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-investitionsrechner',
  templateUrl: 'modal-investitionsrechner.html',
})
export class ModalInvestitionsrechnerPage {

  constructor(private navCtrl: NavController,
    private navParams: NavParams, 
    private viewCtrl: ViewController) {
  }

// Methode zum Schliessen des Modalds
private closeModal() {
  this.viewCtrl.dismiss();
}

}
