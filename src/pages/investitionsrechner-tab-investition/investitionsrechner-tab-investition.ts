import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';

@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-investition',
  templateUrl: 'investitionsrechner-tab-investition.html',
})
export class InvestitionsrechnerTabInvestitionPage implements OnInit {

  private investitionen: FormGroup;


  constructor(private fb: FormBuilder,
    private tabs: Tabs,
    private investitionsService: InvestitionsrechnerProvider) {
  }

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    this.investitionsService.load();
  }

  private createFormArrayValues() {
    return {
      bezeichnungInvestition: [''],
      betriebsInfraNeuBeschaffungsKosten: [''],
      betriebsInfraNeuInfrastrukturKosten: [''],
      betriebsInfraNeuSonstigeEntstehungsKosten: [''],
      betriebsNeuMaterialKosten: [''],
      betriebsNeuBetriebsundHilfsStoffeKosten: [''],
      betriebsNeuWartungsKosten: [''],
      betriebsNeuEntsorgungsKosten: [''],
      betriebsNeuEnergieKosten: [''],
      betriebsNeuWerkzeugKosten: [''],
      betriebsNeuPersonalKosten: [''],
      betriebsNeuRaumKosten: [''],
      betriebsNeuInstandsetzungKosten: [''],
      betriebsNeuRuestKosten: [''],
      betriebsNeuLagerKosten: [''],
      betriebsNeuSonstigeBetriebsKosten: [''],
      verwertungNeuRueckbauKosten: [''],
      verwertungNeuRestwert: ['']
    }
  }

  buildForm() {
    this.investitionen = this.fb.group({
      alternativen: this.fb.array([
        this.fb.group(this.createFormArrayValues())
      ])
    });
  }

  private submit(value) {
    console.log(value);
    this.setDataToProvider(value);
    this.switchToTabIndex(2);
  }

  addAlternative() {
    let alternativen = <FormArray>this.investitionen.get('alternativen');
    alternativen.push(this.fb.group(
      this.createFormArrayValues()
    ))
  }

  private switchToTabIndex(tabIndex) {
    this.tabs.select(tabIndex);
  }

  private setDataToProvider(value) {
    this.investitionsService.setData(value);
  }
}
