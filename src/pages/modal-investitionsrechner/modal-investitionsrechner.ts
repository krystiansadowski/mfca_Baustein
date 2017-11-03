import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-investitionsrechner',
  templateUrl: 'modal-investitionsrechner.html',
})
export class ModalInvestitionsrechnerPage implements OnInit {

  private ergInvestitionsrechner = [];
  private kapitalwert: number = 0;
  private amortisation: number = 0;

  // Variablen für AmortisationsChart
  private amortisationChartValue: number[];
  private amortisationChartType: string
  private amortisationChartLabels: string[];
  private amortisationChartColors: any[];
  private amortisationChartData: number[];

  // Werte für das Befüllen des AmortisationsChart
  private amortisationChartLabelsValues: string[] = ['Amortisationszeit'];
  private amortisationChartColorValues: string[] = ["#ffa1b5"];
  private amortisationChartDataValues: number[] = [this.amortisation];


    // Variablen für KapitalwertChart
    private kapitalChartValue: number[];
    private kapitalChartType: string
    private kapitalChartLabels: string[];
    private kapitalChartColors: any[];
    private kapitalChartData: number[];
  
    // Werte für das Befüllen des AmortisationsChart
    private kapitalChartLabelsValues: string[] = ['Kapitalwert'];
    private kapitalChartColorValues: string[] = ["#86c7f3"];
    private kapitalChartDataValues: number[] = [this.kapitalwert];


  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController) {
  }


  ngOnInit() {
    this.ergInvestitionsrechner = this.navParams.get('ergInvestitionsrechner');
    console.log(this.ergInvestitionsrechner);

    this.kapitalwert = this.navParams.get('ergInvestitionsrechner').kapitalwert;
    console.log(this.kapitalwert);
    
    this.amortisation = this.navParams.get('ergInvestitionsrechner').amortisation;
    console.log(this.amortisation);

     // Berechnung des prozentualen Gesamtanteils der jeweiligen Kostenträger
     this.amortisationChartValue = this.getamortisationChartValue();

     // Berechnung des prozentualen Gesamtanteils der jeweiligen Kostenträger
     this.kapitalChartValue = this.getKapitalwertChartValue();

     // Gestaltung des Charts
    /* Gestaltung in Methoden ausgelagert, damit das Chart nach belieben spezifiziert werden kann, wie beispielsweise
      this.setAmortisationsChartType("doughnut") -> doughnut-Chart
      weitere Parametermöglichkeiten: doughnut, radar, line, bar
    */
    this.setAmortisationsChartType("bar");
    this.setAmortisationsChartLabels(this.amortisationChartLabelsValues);
    this.setAmortisationsChartColor(this.amortisationChartColorValues);  
    this.setAmortisationsChartData(this.amortisationChartValue);   

    this.setKapitalChartType("bar");
    this.setKapitalChartLabels(this.kapitalChartLabelsValues);
    this.setKapitalChartColor(this.kapitalChartColorValues);  
    this.setKapitalChartData(this.kapitalChartValue);   


    
  }

  private getamortisationChartValue(){
    return [this.amortisation];
  }

  private getKapitalwertChartValue(){
    return [this.kapitalwert];
  }


  // Methoden die Erstellung eines Charts
  
  private setAmortisationsChartType(chartType: string){
    this.amortisationChartType = chartType;
  }
  private setAmortisationsChartLabels(chartLabelValues: string[]) {
    this.amortisationChartLabels = chartLabelValues;
  }
  private setAmortisationsChartColor(chartColorValues: string[]){
    this.amortisationChartColors = [ {backgroundColor: chartColorValues}]; 
  }
  private setAmortisationsChartData(chartDataValues: number[]){
    this.amortisationChartData = chartDataValues;
  }



  private setKapitalChartType(chartType: string){
    this.kapitalChartType = chartType;
  }

  private setKapitalChartLabels(chartLabelValues: string[]) {
    this.kapitalChartLabels = chartLabelValues;
  }
  private setKapitalChartColor(chartColorValues: string[]){
    this.kapitalChartColors = [ {backgroundColor: chartColorValues}]; 
  }
  private setKapitalChartData(chartDataValues: number[]){
    this.kapitalChartData = chartDataValues;
  }






  // Methode zum Schliessen des Modalds
  private closeModal() {
    this.viewCtrl.dismiss();
  }

}