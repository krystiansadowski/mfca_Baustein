import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';

@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-investition',
  templateUrl: 'investitionsrechner-tab-investition.html',
})
export class InvestitionsrechnerTabInvestitionPage implements OnInit {

  private formData: FormGroup;
  private jaehrlicheKostenVorInvestition: number = 0;
  private alleVerwertungskostenVorInvestition: number = 0;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private tabs: Tabs,
    public investitionsrechnerService: InvestitionsrechnerProvider) {

    this.investitionsrechnerService.load();

    this.formData = this.formBuilder.group({
      beschaffensKostenInputCheck: [],
      infrastrukturKostenCheck: [],
      sonstigeEntstehungskostenCheck: [],
      materialKostenInputCheck: [],
      betriebsUndHilfsStoffeInputCheck: [],
      wartungKostenInputCheck: [],
      entsorgungsKostenInputCheck: [],
      energieKostenInputCheck: [],
      werkzeugKostenInputCheck: [],
      personalKostenInputCheck: [],
      instandsetzungKostenInputCheck: [],
      ruestungKostenInputCheck: [],
      lagerKostenInputCheck: [],
      sonstigeBetriebsKostenInputCheck: [],
      rueckbauInputCheck: [],
      restwertInputCheck: [],
      verwertungSonstigeKostenInputCheck: []


    });
  }
  
  ngOnInit() {
    this.investitionsrechnerService.load();

    // let materialKosten = this.investitionsrechnerService.getKostentraegerByName('Materialkosten');
    // let energieKosten = this.investitionsrechnerService.getKostentraegerByName('Energiekosten');
    // let alleKosten = this.investitionsrechnerService.getKostentraegerWerte();
    // let alleKostenBetriebs = this.investitionsrechnerService.getKostentraegerWerteStartsWith('betriebs');

    this.jaehrlicheKostenVorInvestition = this.investitionsrechnerService.sumAlleKostentraegerWerteStartsWith('betriebs');
    this.alleVerwertungskostenVorInvestition =  this.investitionsrechnerService.berechneVerwertungskostenVorInvestition();
  }


  

}
