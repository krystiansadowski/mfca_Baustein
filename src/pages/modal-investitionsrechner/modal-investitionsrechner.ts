import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';


@IonicPage()
@Component({
  selector: 'page-modal-investitionsrechner',
  templateUrl: 'modal-investitionsrechner.html',
})
export class ModalInvestitionsrechnerPage {
  private kapitalwertErgebnisse = [];
  private amortisationszseitErgebnisse = [];
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

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private investitionsrechnerService: InvestitionsrechnerProvider) { }

  ionViewWillEnter() {
    this.investitionsrechnerService.load();

    var alternativen = this.investitionsrechnerService.getAlternativen('alternativen');
    this.berechneKapitalUndAmortisationforEachAlternative(alternativen);
  }


  private berechneKapitalUndAmortisationforEachAlternative(alternativen) {
    for (var indexOfArray in alternativen) {
      var alternative = alternativen[indexOfArray];
      for (var i = 0; i < alternative.length; i++) {
        var alternativeObjekt = alternative[i];

        var nutzungsdauer = this.investitionsrechnerService.getNutzungsdauer();
        var zinsFaktor = this.investitionsrechnerService.getZinsfaktor();
        var jaehrlicheKostenVorInvestition = this.berechneVerwertungskostenVorInvestition(alternativeObjekt);
        var jaehrlicheEinsparungNachInvestition = this.berechneJaehrlicheEinsparung(alternativeObjekt);
        var kostenEndeNutzungNachInvestition = this.berechneVerwertungskostenNachInvestition(alternativeObjekt);

        var kapitalwert = this.berechneKapitalwert(jaehrlicheKostenVorInvestition, jaehrlicheEinsparungNachInvestition, kostenEndeNutzungNachInvestition, nutzungsdauer, zinsFaktor);
        this.kapitalwertErgebnisse.push(kapitalwert);
        console.log("Berechnete Kapitalwerte: ", this.kapitalwertErgebnisse);

        var amortisationszeit = this.berechneAmortisation(jaehrlicheKostenVorInvestition, zinsFaktor, jaehrlicheEinsparungNachInvestition);
        this.amortisationszseitErgebnisse.push(amortisationszeit);
        console.log("Berechnete Amortisationszeiten: ", this.amortisationszseitErgebnisse);
      }
    }
  }

  private getZinsfaktor() {
    var zinsaktor = this.investitionsrechnerService.zinsFaktor();
    console.log("Zinsfaktor: " + zinsaktor);
    return zinsaktor;
  }

  private getNutzungsdauer() {
    return this.investitionsrechnerService.getNutzungsdauer();
  }


  berechneVerwertungskostenVorInvestition(alternativeObjekt) {
    var ergVerwertungskostenVorInvestition = 0.0;
    var beschaffungsUndInfrastrukturKosten = this.summiereAlleValuesStartsWith(alternativeObjekt, 'betriebsInfraNeu');

    var rueckbauKosten = parseFloat(this.investitionsrechnerService.getValueByKey("verwertungAltRueckbauKosten"));
    var restWert = parseFloat(this.investitionsrechnerService.getValueByKey("verwertungAltRestwert"));
    var sonstigeKosten = parseFloat(this.investitionsrechnerService.getValueByKey("verwertungAltSonstigeVerwertungKosten"));

    ergVerwertungskostenVorInvestition = beschaffungsUndInfrastrukturKosten + (rueckbauKosten - restWert);
    console.log("Ergebnis: Der jährlichen Kosten vor der Investition betragen : " + ergVerwertungskostenVorInvestition + " Euro.");
    return ergVerwertungskostenVorInvestition;
  }


  berechneVerwertungskostenNachInvestition(alternativeObjekt) {
    var ergVerwertungskostenNachInvestition = 0.0;

    var neuRestwert = parseFloat(this.getValueFromAlternative(alternativeObjekt, "verwertungNeuRestwert"));
    var neuRueckbauKosten = parseFloat(this.getValueFromAlternative(alternativeObjekt, "verwertungNeuRueckbauKosten"));
    ergVerwertungskostenNachInvestition = neuRestwert - neuRueckbauKosten;

    console.log("Ergebnis: Der jährlichen Kosten nach der Investition betragen : " + ergVerwertungskostenNachInvestition + " Euro.");
    return ergVerwertungskostenNachInvestition;
  }


  berechneJaehrlicheEinsparung(alternativeObjekt) {
    var jaehrlicheKostenVorDerInvestition = this.investitionsrechnerService.summiereAlleValuesStartsWith('betriebsAlt');
    var jaehrlicheKostenNachDerInvestition = this.summiereAlleValuesStartsWith(alternativeObjekt, 'betriebsNeu');
    return jaehrlicheKostenVorDerInvestition - jaehrlicheKostenNachDerInvestition;
  }


  private berechneKapitalwert(jaehrlicheKostenVorInvestition, jaehrlicheEinsparungNachInvestition, kostenEndeNutzungNachInvestition, nutzungsdauer, zinsFaktor) {
    return -1 * jaehrlicheKostenVorInvestition + jaehrlicheEinsparungNachInvestition * ((Math.pow(zinsFaktor, nutzungsdauer) - 1) / (Math.pow(zinsFaktor, nutzungsdauer) * (zinsFaktor - 1))) + kostenEndeNutzungNachInvestition / Math.pow(zinsFaktor, nutzungsdauer);
  }

  private berechneAmortisation(jaehrlicheKostenVorInvestition, zinsFaktor, jaehrlicheEinsparungNachInvestition) {
    return Math.log(1 - jaehrlicheKostenVorInvestition * (zinsFaktor - 1) / jaehrlicheEinsparungNachInvestition) / Math.log(1 / zinsFaktor);
  }


// Getter für Alternative-Investitionen
  private getValueFromAlternative(alternativeObjekt, keyToSearch) {
    let valueFound = "";

    for (var eigenschaft in alternativeObjekt) {
      if (alternativeObjekt.hasOwnProperty(eigenschaft)) {
        if (eigenschaft == keyToSearch) {
          if (alternativeObjekt[eigenschaft] == "") {
            alternativeObjekt[eigenschaft] = 0;
          }
          valueFound = alternativeObjekt[eigenschaft];
        }
      }
    }

    console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = ", valueFound);
    return valueFound;
  }

  private getValuesFromWhichStartsWithKey(alternativeObjekt, keyToSearch) {
    let valueFound = [];

    for (var eigenschaft in alternativeObjekt) {
      if (alternativeObjekt.hasOwnProperty(eigenschaft)) {
        if (eigenschaft.startsWith(keyToSearch)) {
          if (alternativeObjekt[eigenschaft] == "") {
            alternativeObjekt[eigenschaft] = 0;
          }
          valueFound.push(alternativeObjekt[eigenschaft]);
        }
      }
    }
    console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = ", valueFound);
    return valueFound;
  }


  // Summierung für Alternative-Investitionen
  summiereAlleValuesStartsWith(alternativeObjekt, keyToSearch) {
    var alleGefundenenValuesGesamt = 0.0;

    var alleGefundenenValues = this.getValuesFromWhichStartsWithKey(alternativeObjekt, keyToSearch);
    for (var i = 0; i < alleGefundenenValues.length; i++) {
      alleGefundenenValuesGesamt += parseFloat(alleGefundenenValues[i]);
    }
    console.log("Berechnung: Ergebnis Summe für die Values Parameter startWith '" + keyToSearch + "' = " + alleGefundenenValuesGesamt.toString());
    return alleGefundenenValuesGesamt;
  }




  // Chart-Darstellung

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


  // Methode zum Schliessen des Modalds
  private closeModal() {
    this.viewCtrl.dismiss();
  }
}
