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
  }

  private buildForm() {
    this.ergebnis = this.fb.group({
      kalkulatorischerZins: [''],
      nutzungsdauer: ['']
    });
  }


  private submit(value) {
    this.setDataToProvider(value);
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