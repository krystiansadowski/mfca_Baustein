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
  // private jaehrlicheKostenVorInvestition: number = 0;
  // private alleVerwertungskostenVorInvestition: number = 0;

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
    // Berechnung der Kosten aus Tab 1  
  //   this.jaehrlicheKostenVorInvestition = this.investitionsrechnerService.sumAlleKostentraegerWerteStartsWith('betriebs');
  //   this.alleVerwertungskostenVorInvestition =  this.investitionsrechnerService.berechneVerwertungskostenVorInvestition();
  }



  private pushValuesToInvestitionrechnerProviderUndWechselZumTabDrei(
    betriebsInfraBeschaffungsKosten, betriebsInfraInfrastrukturKosten, betriebsInfraSonstigeEntstehungsKosten, 
    entNeuMaterialKosten, entNeuBetriebsundHilfsStoffeKosten, entNeuWartungsKosten, 
    entNeuEntsorgungsKosten, entNeuEnergieKosten, entNeuWerkzeugKosten,
    entNeuPersonalKosten, entNeuInstandsetzungKosten, entNeuRuestKosten, 
    entNeuLagerKosten, entNeuSonstigeBetriebsKosten,
    verwertungNeuRueckbauKosten, verwertungNeuRestwert, verwertungNeuSonstigeVerwertungKosten){
      
      // Entstehungskosten der NeuInvestition
      this.setKostenToProvider('betriebsInfraBeschaffungsKosten', betriebsInfraBeschaffungsKosten);
      this.setKostenToProvider('betriebsInfraInfrastrukturKosten', betriebsInfraInfrastrukturKosten);
      this.setKostenToProvider('betriebsInfraSonstigeEntstehungsKosten', betriebsInfraSonstigeEntstehungsKosten);
      this.setKostenToProvider('betriebsNeuMaterialKosten', entNeuMaterialKosten);
      this.setKostenToProvider('betriebsNeuBetriebsundHilfsStoffeKosten', entNeuBetriebsundHilfsStoffeKosten);
      this.setKostenToProvider('betriebsNeuWartungsKosten', entNeuWartungsKosten);
      this.setKostenToProvider('betriebsNeuEnergieKosten', entNeuEnergieKosten);
      this.setKostenToProvider('betriebsNeuWerkzeugKosten', entNeuWerkzeugKosten);
      this.setKostenToProvider('betriebsNeuPersonalKosten', entNeuPersonalKosten);
      this.setKostenToProvider('betriebsNeuInstandsetzungKosten', entNeuInstandsetzungKosten);
      this.setKostenToProvider('betriebsNeuRuestKosten', entNeuRuestKosten);
      this.setKostenToProvider('betriebsNeuLagerKosten', entNeuLagerKosten);
      this.setKostenToProvider('betriebsNeuSonstigeBetriebsKosten', entNeuSonstigeBetriebsKosten);

      // Verwertungskosten der NeuInvestition
      this.setKostenToProvider('verwertungNeuRueckbauKosten', verwertungNeuRueckbauKosten);
      this.setKostenToProvider('verwertungNeuRestwert', verwertungNeuRestwert);
      // this.setKostenToProvider('verwertungNeuSonstigeVerwertungKosten', verwertungNeuSonstigeVerwertungKosten);
      
      
      this.switchToTabWithData(2);
    }

    private switchToTabWithData(tabIndex) {
      this.tabs.select(tabIndex);
    }
  
    // Provider Methoden 
    private setKostenToProvider(kostenTyp, kostenValue) {
      this.investitionsrechnerService.setKostentraeger(kostenTyp, kostenValue);
    }
  



}
