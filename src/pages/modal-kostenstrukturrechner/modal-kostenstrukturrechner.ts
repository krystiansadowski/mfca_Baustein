import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal-kostenstrukturrechner',
  templateUrl: 'modal-kostenstrukturrechner.html',
})
export class ModalKostenstrukturrechnerPage implements OnInit {

  // Auslesen der Benutzereingabe und nach float parsen
  private materialKosten: number = this.getKostentraegerValueAusForm('materialKosten');
  private energieKosten: number = this.getKostentraegerValueAusForm('energieKosten');
  private handelswarenKosten: number = this.getKostentraegerValueAusForm('handelswarekosten');
  private lohnarbeitKosten: number = this.getKostentraegerValueAusForm('lohnkosten');
  private personalKosten: number = this.getKostentraegerValueAusForm('personalkosten');
  private abschreibungKosten: number = this.getKostentraegerValueAusForm('abschreibungskosten');
  private instandhaltungKosten: number = this.getKostentraegerValueAusForm('instandhaltungkosten');
  private mieteKosten: number = this.getKostentraegerValueAusForm('mietekosten');
  private sonstigeKosten: number = this.getKostentraegerValueAusForm('sonstigekosten');

  private alleKostenValuesAsArray: number[];
  
  // Initialisierung der Gesamtkosten;
  private gesamtKosten: number = 0;

  // Initialisierung der prozentualen Anteils der jeweiligen Kosten
  private materialKostenAnteil: number = 0;
  private energieKostenAnteil: number = 0;
  private handelswarenKostenAnteil: number = 0;
  private lohnarbeitKostenAnteil: number = 0;
  private personalKostenAnteil: number = 0;
  private abschreibungKostenAnteil: number = 0;
  private instandhaltungKostenAnteil: number = 0;
  private mieteKostenAnteil: number = 0;
  private sonstigeKostenAnteil: number = 0;

  private alleProzentualenAnteileDerKostentraeger: number[];
  
  //  Variablen für die Charterstellung
  private chartType: string
  private chartLabels: string[];
  private chartColors: any[];
  private chartData: number[];

  // Werte für das Befüllen des Charts
  private chartLabelsValues: string[] = ['Material', 'Energie', 'Handelsware', 'Lohn',
  'Personal', 'Abschreibung', 'Instandhaltung',
  'Miete', 'Sonstiges'];

  private chartColorValues: string[] = ["#69f070", "#fcfc8c", "#8a634d", "#54d2c9",
  "#6866d3", "#cb6070", "#6386a4","#d0e5f6", "#87a277"];

  private chartDataValues: number[] = [this.materialKostenAnteil, this.energieKostenAnteil, this.handelswarenKostenAnteil,
    this.lohnarbeitKostenAnteil, this.personalKostenAnteil, this.abschreibungKostenAnteil,
    this.instandhaltungKostenAnteil, this.mieteKostenAnteil, this.sonstigeKostenAnteil];


  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ngOnInit() {
    // Berechnung der Gesamtkosten
    this.alleKostenValuesAsArray = this.createAlleKostenValuesAsArrayAsArray();
    this.gesamtKosten = this.berechneGesamtkosten(this.alleKostenValuesAsArray);

    // Berechnung des prozentualen Gesamtanteils der jeweiligen Kostenträger
    this.alleProzentualenAnteileDerKostentraeger = this.getAlleProzentualenAnteileDerKostentraeger();

  
    // Gestaltung des Charts
    /* Gestaltung in Methoden ausgelagert, damit das Chart nach belieben spezifiziert werden kann, wie beispielsweise
      this.setChartType("doughnut") -> doughnut-Chart
      weitere Parametermöglichkeiten: doughnut, radar, line, bar
    */
    this.setChartType("pie");
    this.setChartLabels(this.chartLabelsValues);
    this.setChartColor(this.chartColorValues);  
    this.setChartData(this.alleProzentualenAnteileDerKostentraeger);   
  }

  private createAlleKostenValuesAsArrayAsArray() {
    return [
      this.materialKosten,
      this.energieKosten,
      this.handelswarenKosten,
      this.lohnarbeitKosten,
      this.personalKosten,
      this.abschreibungKosten,
      this.instandhaltungKosten,
      this.mieteKosten,
      this.sonstigeKosten
    ]
  }

  // Auslesen der eingetragenen Werte aus dem Formular
  private getKostentraegerValueAusForm(kostentraeger: string){
    let kostentraegerValue = parseFloat(this.navParams.get(kostentraeger));

    if(isNaN(kostentraegerValue)){
      // kostentraegerValue = 0
      return kostentraegerValue = 0;
    }
    else {
      return kostentraegerValue;
    }
  }


  // Methoden zur Berechnung

  private berechneGesamtkosten(alleKostenArray: number[]) {
    return alleKostenArray.reduce(summe, 0);

    function summe(a, b) {
      return a + b;
    }
  }
  
  private berechneUndRundeProzentualenAnteilDesKostentraegers(kostenArt: number) {
    return parseFloat(((kostenArt / this.gesamtKosten) * 100).toFixed(2));
  }

  private getAlleProzentualenAnteileDerKostentraeger(){
    return [
      this.materialKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.materialKosten),
      this.energieKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.energieKosten),
      this.handelswarenKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.handelswarenKosten),
      this.lohnarbeitKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.lohnarbeitKosten),
      this.personalKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.personalKosten),
      this.abschreibungKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.abschreibungKosten),
      this.instandhaltungKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.instandhaltungKosten),
      this.mieteKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.mieteKosten),
      this.sonstigeKostenAnteil = this.berechneUndRundeProzentualenAnteilDesKostentraegers(this.sonstigeKosten)
    ];
  }


  // Methoden die Erstellung eines Charts
  
  private setChartType(chartType: string){
    this.chartType = chartType;
  }

  private setPieChartData(){
    return [this.materialKostenAnteil, this.energieKostenAnteil, this.handelswarenKostenAnteil,
      this.lohnarbeitKostenAnteil, this.personalKostenAnteil, this.abschreibungKostenAnteil,
      this.instandhaltungKostenAnteil, this.mieteKostenAnteil, this.sonstigeKostenAnteil];
  }

  private setChartLabels(chartLabelValues: string[]) {
    this.chartLabels = chartLabelValues;
  }

  private setChartColor(chartColorValues: string[]){
    this.chartColors = [ {backgroundColor: chartColorValues}]; 
  }

  private setChartData(chartDataValues: number[]){
    this.chartData = chartDataValues;
  }

  

// Methode zum Schliessen des Modalds
  public closeModal() {
    this.viewCtrl.dismiss();
  }
}