import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';


@IonicPage()
@Component({
  selector: 'page-modal-investitionsrechner',
  templateUrl: 'modal-investitionsrechner.html',
})
export class ModalInvestitionsrechnerPage {

  // private ergInvestitionsrechner = [];
  // private kapitalwert: number = 0;
  // private amortisation: number = 0;

  // private bezeichnungInvestition = [];


  // // Variablen für AmortisationsChart
  // private amortisationChartValue: number[];
  // private amortisationChartType: string
  // private amortisationChartColors: any[];
  // private amortisationChartData: number[];

  // // Werte für das Befüllen des AmortisationsChart
  // // private amortisationChartLabelsValues: string[] = [this.getInvestitionsBezeichnung];
  // private amortisationChartColorValues: string[] = ["#ffa1b5"];
  // private amortisationChartDataValues: number[] = [this.amortisation];


  // // Variablen für KapitalwertChart
  // private kapitalChartValue: number[];
  // private kapitalChartType: string
  // private kapitalChartColors: any[];
  // private kapitalChartData: number[];

  // // Werte für das Befüllen des AmortisationsChart
  // private kapitalChartColorValues: string[] = ["#86c7f3"];
  // private kapitalChartDataValues: number[] = [this.kapitalwert];

  // // Variablen die für beide Charts geleten
  // private chartLabels: string[];
  // private  barChartLegend:boolean = false;


  // constructor(private navCtrl: NavController,
  //   private navParams: NavParams,
  //   private viewCtrl: ViewController,
  //   private investitionsrechnerService: InvestitionsrechnerProvider) {
  // }


  // ngOnInit() {
  //   this.investitionsrechnerService.load();

  //   this.ergInvestitionsrechner = this.navParams.get('ergInvestitionsrechner');
  //   console.log(this.ergInvestitionsrechner);

  //   this.kapitalwert = this.navParams.get('ergInvestitionsrechner').kapitalwert;
  //   console.log(this.kapitalwert);

  //   this.amortisation = this.navParams.get('ergInvestitionsrechner').amortisation;
  //   console.log(this.amortisation);

  //   // Setzen des errechnenten Wertes für die Amortisation
  //   this.amortisationChartValue = this.getamortisationChartValue();

  //   // Setzen des errechnenten Wertes für den Kapitalwert
  //   this.kapitalChartValue = this.getKapitalwertChartValue();

  //   // Gestaltung des Charts
  //   /* Gestaltung in Methoden ausgelagert, damit das Chart nach belieben spezifiziert werden kann, wie beispielsweise
  //     this.setAmortisationsChartType("doughnut") -> doughnut-Chart
  //     weitere Parametermöglichkeiten: doughnut, radar, line, bar
  //   */
  //   this.setAmortisationsChartType("bar");
  //   this.setAmortisationsChartColor(this.amortisationChartColorValues);
  //   this.setAmortisationsChartData(this.amortisationChartValue);

  //   this.setKapitalChartType("bar");
  //   this.setKapitalChartColor(this.kapitalChartColorValues);
  //   this.setKapitalChartData(this.kapitalChartValue);


  //   this.setChartLabels(this.getInvestitionsBezeichnung());


  // }

  // private getamortisationChartValue() {
  //   return [this.amortisation];
  // }

  // private getKapitalwertChartValue() {
  //   return [this.kapitalwert];
  // }

  // private getInvestitionsBezeichnung() {
  //   return this.investitionsrechnerService.getValueStartsWith('bezeichnungInvestition');
  // }

  // private pushBezeichnungZuDenCharts(){
  //   let bezeichnungsArray = [(this.bezeichnungInvestition)];
  //   return bezeichnungsArray;

  // }


  // // Methoden die Erstellung eines Charts

  // private setAmortisationsChartType(chartType: string) {
  //   this.amortisationChartType = chartType;
  // }

  // private setAmortisationsChartColor(chartColorValues: string[]) {
  //   this.amortisationChartColors = [{ backgroundColor: chartColorValues }];
  // }
  // private setAmortisationsChartData(chartDataValues: number[]) {
  //   this.amortisationChartData = chartDataValues;
  // }



  // private setKapitalChartType(chartType: string) {
  //   this.kapitalChartType = chartType;
  // }

  // private setKapitalChartColor(chartColorValues: string[]) {
  //   this.kapitalChartColors = [{ backgroundColor: chartColorValues }];
  // }
  // private setKapitalChartData(chartDataValues: number[]) {
  //   this.kapitalChartData = chartDataValues;
  // }

  // // für beide die Methoden
  // private setChartLabels(chartLabelValues: string[]) {
  //   this.chartLabels = this.getInvestitionsBezeichnung();
  // }







  // NEU

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private investitionsService: InvestitionsrechnerProvider) { }

  ionViewWillEnter() {
    this.investitionsService.load();

    // Tab Anlagen
    console.log("Tab Anlagen: ");
    let betriebsAltMaterial = this.investitionsService.getValueByKey('betriebsAltMaterial');
    console.log("Investitionstab gefunden: " + betriebsAltMaterial);
    var arrayStartwith = this.investitionsService.getValueStartsWith('betriebsAlt');
    console.log("Investitionstab gefunden: " + arrayStartwith);
    var summe = this.investitionsService.summiereAlleValuesStartsWith('betriebsAlt');

    // Tab Investitionen
    console.log("Tab Investition: ");
    var summe2 = this.investitionsService.summiereAlleValuesStartsWith('betriebsInfraNeu');

    var alternativen = this.investitionsService.getAlternativen();
  }


  // Methode zum Schliessen des Modalds
  private closeModal() {
    this.viewCtrl.dismiss();
  }

}
