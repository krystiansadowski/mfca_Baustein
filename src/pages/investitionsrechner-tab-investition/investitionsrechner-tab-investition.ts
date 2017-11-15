import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';

@IonicPage()
@Component({
  selector: 'page-investitionsrechner-tab-investition',
  templateUrl: 'investitionsrechner-tab-investition.html',
})
export class InvestitionsrechnerTabInvestitionPage implements OnInit{

  private formData: FormGroup;
  private calculateAlternativeForm: boolean = false;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private tabs: Tabs) {

    // this.formData = this.formBuilder.group({
    //   bezeichnungInvestitionCheck: [],
    //   beschaffensKostenInputCheck: [],
    //   infrastrukturKostenCheck: [],
    //   sonstigeEntstehungskostenCheck: [],
    //   materialKostenInputCheck: [],
    //   betriebsUndHilfsStoffeInputCheck: [],
    //   wartungKostenInputCheck: [],
    //   entsorgungsKostenInputCheck: [],
    //   energieKostenInputCheck: [],
    //   werkzeugKostenInputCheck: [],
    //   personalKostenInputCheck: [],
    //   raumKostenInputCheck: [],
    //   instandsetzungKostenInputCheck: [],
    //   ruestungKostenInputCheck: [],
    //   lagerKostenInputCheck: [],
    //   sonstigeBetriebsKostenInputCheck: [],
    //   rueckbauInputCheck: [],
    //   restwertInputCheck: []
    // });
  }

  ngOnInit(){
    this.buildForm();
  }

  private buildForm(){
    this.formData = this.formBuilder.group({
      beschaffensKostenInputCheck: this.formBuilder.array([
        this.formBuilder.group({
          beschaffungsKostenInvestitionTab: ['']
        })
      ])
    });
  }


  // private pushValuesToInvestitionrechnerProviderUndWechselZumTabDrei(
  //   bezeichnungInvestition,
  //   betriebsInfraNeuBeschaffungsKosten, betriebsInfraNeuInfrastrukturKosten, betriebsInfraNeuSonstigeEntstehungsKosten,
  //   betriebsNeuMaterialKosten, betriebsNeuBetriebsundHilfsStoffeKosten, betriebsNeuWartungsKosten,
  //   betriebsNeuEntsorgungsKosten, betriebsNeuEnergieKosten, betriebsNeuWerkzeugKosten,
  //   betriebsNeuPersonalKosten, betriebsNeuRaumKosten, betriebsNeuInstandsetzungKosten,
  //   betriebsNeuRuestKosten, betriebsNeuLagerKosten, betriebsNeuSonstigeBetriebsKosten,
  //   verwertungNeuRueckbauKosten, verwertungNeuRestwert) {
  //   // verwertungNeuSonstigeVerwertungKosten

  //   // Entstehungskosten der NeuInvestition
  //   this.setKeyValueMappingToProvider('investitionBezeichnung', bezeichnungInvestition);
  //   this.setKeyValueMappingToProvider('betriebsInfraNeuBeschaffungsKosten', betriebsInfraNeuBeschaffungsKosten);
  //   this.setKeyValueMappingToProvider('betriebsInfraNeuInfrastrukturKosten', betriebsInfraNeuInfrastrukturKosten);
  //   this.setKeyValueMappingToProvider('betriebsInfraNeuSonstigeEntstehungsKosten', betriebsInfraNeuSonstigeEntstehungsKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuMaterialKosten', betriebsNeuMaterialKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuBetriebsundHilfsStoffeKosten', betriebsNeuBetriebsundHilfsStoffeKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuWartungsKosten', betriebsNeuWartungsKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuEntsorgungsKosten', betriebsNeuEntsorgungsKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuEnergieKosten', betriebsNeuEnergieKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuWerkzeugKosten', betriebsNeuWerkzeugKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuPersonalKosten', betriebsNeuPersonalKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuRaumKosten', betriebsNeuRaumKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuInstandsetzungKosten', betriebsNeuInstandsetzungKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuRuestKosten', betriebsNeuRuestKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuLagerKosten', betriebsNeuLagerKosten);
  //   this.setKeyValueMappingToProvider('betriebsNeuSonstigeBetriebsKosten', betriebsNeuSonstigeBetriebsKosten);

  //   // Verwertungskosten der NeuInvestition
  //   this.setKeyValueMappingToProvider('verwertungNeuRueckbauKosten', verwertungNeuRueckbauKosten);
  //   this.setKeyValueMappingToProvider('verwertungNeuRestwert', verwertungNeuRestwert);
  //   // this.setKeyValueMappingToProvider('verwertungNeuSonstigeVerwertungKosten', verwertungNeuSonstigeVerwertungKosten);

  //   this.switchToTabIndex(2);
  // }

  // private setKeyValueMappingToProvider(key, value) {
  //   this.investitionsrechnerService.setKeyValueMappingToProvider(key, value);
  // }

  // private addAlternative() {
  //  this.calculateAlternativeForm = true;

  // }





  private switchToTabIndex(tabIndex) {
    this.tabs.select(tabIndex);
  }

}
