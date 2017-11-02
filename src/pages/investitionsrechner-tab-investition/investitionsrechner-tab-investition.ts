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

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private tabs: Tabs,
    public investitionsrechnerService: InvestitionsrechnerProvider) {
      console.log('Constructor Tab 2');

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
      raumKostenInputCheck: [],
      instandsetzungKostenInputCheck: [],
      ruestungKostenInputCheck: [],
      lagerKostenInputCheck: [],
      sonstigeBetriebsKostenInputCheck: [],
      rueckbauInputCheck: [],
      restwertInputCheck: []
      // verwertungSonstigeKostenInputCheck: []
    });
    
  }
  
  ngOnInit() {
    console.log('NgOnItnit Tab 2')
    this.investitionsrechnerService.load();
  }



  private pushValuesToInvestitionrechnerProviderUndWechselZumTabDrei(
    betriebsInfraNeuBeschaffungsKosten, betriebsInfraNeuInfrastrukturKosten, betriebsInfraNeuSonstigeEntstehungsKosten, 
    betriebsNeuMaterialKosten, betriebsNeuBetriebsundHilfsStoffeKosten, betriebsNeuWartungsKosten, 
    betriebsNeuEntsorgungsKosten, betriebsNeuEnergieKosten, betriebsNeuWerkzeugKosten,
    betriebsNeuPersonalKosten, betriebsNeuRaumKosten, betriebsNeuInstandsetzungKosten,  
    betriebsNeuRuestKosten, betriebsNeuLagerKosten, betriebsNeuSonstigeBetriebsKosten,
    verwertungNeuRueckbauKosten, verwertungNeuRestwert, verwertungNeuSonstigeVerwertungKosten){
      
      // Entstehungskosten der NeuInvestition
      this.setKostenToProvider('betriebsInfraNeuBeschaffungsKosten', betriebsInfraNeuBeschaffungsKosten);
      this.setKostenToProvider('betriebsInfraNeuInfrastrukturKosten', betriebsInfraNeuInfrastrukturKosten);
      this.setKostenToProvider('betriebsInfraNeuSonstigeEntstehungsKosten', betriebsInfraNeuSonstigeEntstehungsKosten);
      this.setKostenToProvider('betriebsNeuMaterialKosten', betriebsNeuMaterialKosten);
      this.setKostenToProvider('betriebsNeuBetriebsundHilfsStoffeKosten', betriebsNeuBetriebsundHilfsStoffeKosten);
      this.setKostenToProvider('betriebsNeuWartungsKosten', betriebsNeuWartungsKosten);
      this.setKostenToProvider('betriebsNeuEntsorgungsKosten', betriebsNeuEntsorgungsKosten);
      this.setKostenToProvider('betriebsNeuEnergieKosten', betriebsNeuEnergieKosten);
      this.setKostenToProvider('betriebsNeuWerkzeugKosten', betriebsNeuWerkzeugKosten);
      this.setKostenToProvider('betriebsNeuPersonalKosten', betriebsNeuPersonalKosten);
      this.setKostenToProvider('betriebsNeuRaumKosten', betriebsNeuRaumKosten);
      this.setKostenToProvider('betriebsNeuInstandsetzungKosten', betriebsNeuInstandsetzungKosten);
      this.setKostenToProvider('betriebsNeuRuestKosten', betriebsNeuRuestKosten);
      this.setKostenToProvider('betriebsNeuLagerKosten', betriebsNeuLagerKosten);
      this.setKostenToProvider('betriebsNeuSonstigeBetriebsKosten', betriebsNeuSonstigeBetriebsKosten);

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
